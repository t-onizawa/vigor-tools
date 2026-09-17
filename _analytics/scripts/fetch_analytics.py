#!/usr/bin/env python3
"""Fetch weekly GA4 and Search Console data for VIGOR LAB."""

from __future__ import annotations

import argparse
import json
import sys
import traceback
from datetime import datetime
from typing import Any, Callable, Dict, List, Optional

import google.auth
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    DateRange,
    Dimension,
    Filter,
    FilterExpression,
    FilterExpressionList,
    Metric,
    OrderBy,
    RunReportRequest,
)
from googleapiclient.discovery import build


GA4_PROPERTY = "properties/547504460"
GSC_SITE_URL = "sc-domain:vigorlab.net"
SCOPES = [
    "https://www.googleapis.com/auth/analytics.readonly",
    "https://www.googleapis.com/auth/webmasters.readonly",
]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Fetch GA4 and Search Console data as a single JSON object."
    )
    parser.add_argument("--start-date", required=True, help="Start date, YYYY-MM-DD")
    parser.add_argument("--end-date", required=True, help="End date, YYYY-MM-DD")
    args = parser.parse_args()

    for value, name in ((args.start_date, "--start-date"), (args.end_date, "--end-date")):
        try:
            datetime.strptime(value, "%Y-%m-%d")
        except ValueError:
            parser.error(f"{name} must be YYYY-MM-DD")

    return args


def short_error(exc: BaseException) -> str:
    message = str(exc).strip()
    if not message:
        message = exc.__class__.__name__
    first_line = message.splitlines()[0]
    return first_line[:300]


class Clients:
    def __init__(self) -> None:
        self._credentials = None
        self._ga4: Optional[BetaAnalyticsDataClient] = None
        self._gsc = None

    @property
    def credentials(self):
        if self._credentials is None:
            credentials, _ = google.auth.default(scopes=SCOPES)
            self._credentials = credentials
        return self._credentials

    @property
    def ga4(self) -> BetaAnalyticsDataClient:
        if self._ga4 is None:
            self._ga4 = BetaAnalyticsDataClient(credentials=self.credentials)
        return self._ga4

    @property
    def gsc(self):
        if self._gsc is None:
            self._gsc = build(
                "searchconsole",
                "v1",
                credentials=self.credentials,
                cache_discovery=False,
            )
        return self._gsc


def metric_value(row: Any, index: int, cast: Callable[[str], Any] = int) -> Any:
    if row is None or index >= len(row.metric_values):
        return cast("0")
    value = row.metric_values[index].value or "0"
    return cast(value)


def row_dimension(row: Any, index: int) -> str:
    if row is None or index >= len(row.dimension_values):
        return ""
    return row.dimension_values[index].value


def run_ga4_report(
    client: BetaAnalyticsDataClient,
    start_date: str,
    end_date: str,
    metrics: List[str],
    dimensions: Optional[List[str]] = None,
    dimension_filter: Optional[FilterExpression] = None,
    limit: Optional[int] = None,
    order_metric: Optional[str] = None,
) -> Any:
    request = RunReportRequest(
        property=GA4_PROPERTY,
        date_ranges=[DateRange(start_date=start_date, end_date=end_date)],
        metrics=[Metric(name=name) for name in metrics],
        dimensions=[Dimension(name=name) for name in dimensions or []],
        dimension_filter=dimension_filter,
        limit=limit,
    )
    if order_metric:
        request.order_bys = [
            OrderBy(
                metric=OrderBy.MetricOrderBy(metric_name=order_metric),
                desc=True,
            )
        ]
    return client.run_report(request)


def string_filter(field_name: str, value: str, match_type: Filter.StringFilter.MatchType) -> FilterExpression:
    return FilterExpression(
        filter=Filter(
            field_name=field_name,
            string_filter=Filter.StringFilter(match_type=match_type, value=value),
        )
    )


def and_filter(*expressions: FilterExpression) -> FilterExpression:
    return FilterExpression(and_group=FilterExpressionList(expressions=list(expressions)))


def fetch_ga4_overall(clients: Clients, start_date: str, end_date: str) -> Dict[str, Any]:
    defaults = {
        "activeUsers": 0,
        "newUsers": 0,
        "sessions": 0,
        "screenPageViews": 0,
        "engagementRate": 0.0,
        "averageSessionDuration": 0.0,
        "channels": {"Organic Search": 0, "Direct": 0, "Referral": 0},
        "error": None,
    }

    totals = run_ga4_report(
        clients.ga4,
        start_date,
        end_date,
        [
            "activeUsers",
            "newUsers",
            "sessions",
            "screenPageViews",
            "engagementRate",
            "averageSessionDuration",
        ],
    )
    row = totals.rows[0] if totals.rows else None
    defaults.update(
        {
            "activeUsers": metric_value(row, 0),
            "newUsers": metric_value(row, 1),
            "sessions": metric_value(row, 2),
            "screenPageViews": metric_value(row, 3),
            "engagementRate": metric_value(row, 4, float),
            "averageSessionDuration": metric_value(row, 5, float),
        }
    )

    channels = run_ga4_report(
        clients.ga4,
        start_date,
        end_date,
        ["sessions"],
        dimensions=["sessionDefaultChannelGroup"],
        limit=50,
    )
    for channel_row in channels.rows:
        channel = row_dimension(channel_row, 0)
        if channel in defaults["channels"]:
            defaults["channels"][channel] = metric_value(channel_row, 0)

    return defaults


def fetch_ga4_google_organic(clients: Clients, start_date: str, end_date: str) -> Dict[str, Any]:
    result = {
        "sessions": 0,
        "activeUsers": 0,
        "newUsers": 0,
        "topLandingPages": [],
        "error": None,
    }
    organic_filter = string_filter(
        "sessionDefaultChannelGroup",
        "Organic Search",
        Filter.StringFilter.MatchType.EXACT,
    )

    totals = run_ga4_report(
        clients.ga4,
        start_date,
        end_date,
        ["sessions", "activeUsers", "newUsers"],
        dimension_filter=organic_filter,
    )
    row = totals.rows[0] if totals.rows else None
    result.update(
        {
            "sessions": metric_value(row, 0),
            "activeUsers": metric_value(row, 1),
            "newUsers": metric_value(row, 2),
        }
    )

    pages = run_ga4_report(
        clients.ga4,
        start_date,
        end_date,
        ["screenPageViews", "activeUsers", "averageSessionDuration"],
        dimensions=["landingPagePlusQueryString"],
        dimension_filter=organic_filter,
        limit=10,
        order_metric="screenPageViews",
    )
    result["topLandingPages"] = [
        {
            "page": row_dimension(page_row, 0),
            "views": metric_value(page_row, 0),
            "users": metric_value(page_row, 1),
            "averageSessionDuration": metric_value(page_row, 2, float),
        }
        for page_row in pages.rows
    ]
    return result


def fetch_ga4_product(
    clients: Clients,
    start_date: str,
    end_date: str,
    path_regex: str,
) -> Dict[str, Any]:
    result = {
        "organicSessions": 0,
        "screenPageViews": 0,
        "topPages": [],
        "error": None,
    }
    path_filter = string_filter("pagePath", path_regex, Filter.StringFilter.MatchType.FULL_REGEXP)
    organic_filter = string_filter(
        "sessionDefaultChannelGroup",
        "Organic Search",
        Filter.StringFilter.MatchType.EXACT,
    )

    organic = run_ga4_report(
        clients.ga4,
        start_date,
        end_date,
        ["sessions"],
        dimension_filter=and_filter(path_filter, organic_filter),
    )
    organic_row = organic.rows[0] if organic.rows else None
    result["organicSessions"] = metric_value(organic_row, 0)

    views = run_ga4_report(
        clients.ga4,
        start_date,
        end_date,
        ["screenPageViews"],
        dimension_filter=path_filter,
    )
    views_row = views.rows[0] if views.rows else None
    result["screenPageViews"] = metric_value(views_row, 0)

    pages = run_ga4_report(
        clients.ga4,
        start_date,
        end_date,
        ["screenPageViews"],
        dimensions=["pagePath"],
        dimension_filter=path_filter,
        limit=10,
        order_metric="screenPageViews",
    )
    result["topPages"] = [
        {"page": row_dimension(page_row, 0), "views": metric_value(page_row, 0)}
        for page_row in pages.rows
    ]
    return result


def query_search_console(
    clients: Clients,
    start_date: str,
    end_date: str,
    search_type: str,
    dimensions: Optional[List[str]] = None,
    row_limit: int = 10,
) -> Dict[str, Any]:
    body: Dict[str, Any] = {
        "startDate": start_date,
        "endDate": end_date,
        "searchType": search_type,
        "rowLimit": row_limit,
    }
    if dimensions:
        body["dimensions"] = dimensions

    return (
        clients.gsc.searchanalytics()
        .query(siteUrl=GSC_SITE_URL, body=body)
        .execute()
    )


def fetch_search_console(clients: Clients, start_date: str, end_date: str, search_type: str) -> Dict[str, Any]:
    result = {
        "clicks": 0,
        "impressions": 0,
        "ctr": 0.0,
        "position": 0.0,
        "topQueries": [],
        "topPages": [],
        "error": None,
    }

    summary = query_search_console(clients, start_date, end_date, search_type, row_limit=1)
    summary_row = (summary.get("rows") or [{}])[0]
    result.update(
        {
            "clicks": int(summary_row.get("clicks", 0)),
            "impressions": int(summary_row.get("impressions", 0)),
            "ctr": float(summary_row.get("ctr", 0.0)),
            "position": float(summary_row.get("position", 0.0)),
        }
    )

    queries = query_search_console(
        clients,
        start_date,
        end_date,
        search_type,
        dimensions=["query"],
        row_limit=10,
    )
    result["topQueries"] = [
        {
            "query": (row.get("keys") or [""])[0],
            "clicks": int(row.get("clicks", 0)),
            "impressions": int(row.get("impressions", 0)),
            "ctr": float(row.get("ctr", 0.0)),
            "position": float(row.get("position", 0.0)),
        }
        for row in queries.get("rows", [])
    ]

    pages = query_search_console(
        clients,
        start_date,
        end_date,
        search_type,
        dimensions=["page"],
        row_limit=10,
    )
    result["topPages"] = [
        {
            "page": (row.get("keys") or [""])[0],
            "clicks": int(row.get("clicks", 0)),
            "impressions": int(row.get("impressions", 0)),
            "ctr": float(row.get("ctr", 0.0)),
            "position": float(row.get("position", 0.0)),
        }
        for row in pages.get("rows", [])
    ]

    return result


def with_category_error(
    output: Dict[str, Any],
    key: str,
    fetcher: Callable[[], Dict[str, Any]],
    fallback: Dict[str, Any],
) -> None:
    try:
        output[key] = fetcher()
    except Exception as exc:  # noqa: BLE001 - categories must fail independently.
        print(f"{key}: {short_error(exc)}", file=sys.stderr)
        fallback["error"] = short_error(exc)
        output[key] = fallback


def main() -> int:
    args = parse_args()
    clients = Clients()
    output: Dict[str, Any] = {
        "period": {"start": args.start_date, "end": args.end_date},
    }

    try:
        with_category_error(
            output,
            "ga4_overall",
            lambda: fetch_ga4_overall(clients, args.start_date, args.end_date),
            {
                "activeUsers": 0,
                "newUsers": 0,
                "sessions": 0,
                "screenPageViews": 0,
                "engagementRate": 0.0,
                "averageSessionDuration": 0.0,
                "channels": {"Organic Search": 0, "Direct": 0, "Referral": 0},
            },
        )
        with_category_error(
            output,
            "ga4_google_organic",
            lambda: fetch_ga4_google_organic(clients, args.start_date, args.end_date),
            {
                "sessions": 0,
                "activeUsers": 0,
                "newUsers": 0,
                "topLandingPages": [],
            },
        )
        with_category_error(
            output,
            "ga4_tools",
            lambda: fetch_ga4_product(clients, args.start_date, args.end_date, "^/tools/"),
            {"organicSessions": 0, "screenPageViews": 0, "topPages": []},
        )
        with_category_error(
            output,
            "ga4_matsuri",
            lambda: fetch_ga4_product(clients, args.start_date, args.end_date, "^/matsuri/"),
            {"organicSessions": 0, "screenPageViews": 0, "topPages": []},
        )
        with_category_error(
            output,
            "search_console_web",
            lambda: fetch_search_console(clients, args.start_date, args.end_date, "web"),
            {
                "clicks": 0,
                "impressions": 0,
                "ctr": 0.0,
                "position": 0.0,
                "topQueries": [],
                "topPages": [],
            },
        )
        with_category_error(
            output,
            "search_console_video",
            lambda: fetch_search_console(clients, args.start_date, args.end_date, "video"),
            {
                "clicks": 0,
                "impressions": 0,
                "ctr": 0.0,
                "position": 0.0,
                "topQueries": [],
                "topPages": [],
            },
        )
    except Exception as exc:  # noqa: BLE001 - still print whatever was gathered.
        print(f"unexpected error: {short_error(exc)}", file=sys.stderr)
        traceback.print_exc(file=sys.stderr)
        return_code = 1
    else:
        return_code = 0
    finally:
        print(json.dumps(output, ensure_ascii=False, indent=2, sort_keys=True))

    return return_code


if __name__ == "__main__":
    raise SystemExit(main())
