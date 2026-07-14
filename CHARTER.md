# VIGOR LAB — Charter

```
Version: 1.0
Created: 2026-07-14

This document is a living document.
It evolves together with VIGOR LAB.
```

これは VIGOR LAB という組織そのものの運営原則である。

VISION.md がプロダクト（VIGOR TOOLS）の憲法であるのに対し、
本書はその一段上、**VIGOR LAB全体**に適用される。将来 VIGOR TOOLS 以外の
プロダクトが生まれても、本書はそのまま適用される。

本書は完成版ではなく、育てていく前提の文書である。ただし
VISION.md や Backlog.md よりも変更頻度は低くあるべきだ。Mission は
特に変わらない。変えるとしたら、それは VIGOR LAB そのものが変わるとき。

---

## Mission

> **もやもやを、使えるカタチにする。**

これが VIGOR LAB における唯一の Mission である。VIGOR TOOLS も、
将来生まれる別のプロダクトも、すべてこの一文の実現形にすぎない。
プロダクトごとに別の Mission は持たせない。

---

## Scope（適用範囲）

本書は VIGOR LAB 全体に適用される。VIGOR TOOLS に限定されない。

```
VIGOR LAB Charter
  └ VIGOR TOOLS（現在のプロダクト） → VISION.md がこのMissionを実現する
  └ 将来のプロダクト               → それぞれが独自の VISION 文書を持つ
```

個々のプロダクトは、それぞれの Vision・Brand・Principles を持つ。
しかし Mission・Operating Principles・Decision Making・Development System は
すべてのプロダクトに共通して、本書から継承される。

---

## Operating Principles

VIGOR LAB から生まれるすべてのプロダクト・活動に適用される。

- **完璧を待たず、小さく作って早く出す。** v0.1を優先する。
- **出してから改善する。** 反応を見て育てる。
- **Doから始める。** Planから始めない（DCAp思想）。
- **考えすぎて止まる人を助ける。** 完璧主義で自分たちも止まらない。

---

## Decision Making

### 機能役割

役職は機能で定義する。固有名詞（誰が担当しているか）は
`Roles.md` が持つ。ここでは役割の権限範囲だけを定義する。

```
Founder
  組織の最終意思決定者。Vision・ブランド・実体験・公開可否の
  最終判断を持つ。

Product Lead
  Vision管理・Backlog管理・優先順位・市場運用
  （SEO・コンテンツ発信・計測に基づく意思決定）を担う。

Technical Lead
  設計・実装・レビュー・リファクタリング・Platform設計・
  技術的な改善提案・技術ドキュメント整備を担う。
  ブランドやプロダクト企画への提案も行うが、
  最終的な優先順位・公開判断は持たない。
```

### 「提案」と「最終判断」の違い

誰でも、自分の強みの領域で自由に提案してよい。

採用するかどうか・いつ進めるかという**最終判断**は、
その領域を担当する機能役割にある。提案者と決定者が
異なることは前提であり、対立ではない。

### 意思決定の哲学

- 小さく・可逆的な判断を優先する（DCAp的）。
  大きな会議や長い合議より、小さく試して数字で確認する。
- 判断が割れたときは、Founder の最終判断が優先される。

---

## Development System

### AI-DLCとは

VIGOR LAB が現在採用している開発方式である。
**組織原則そのものではなく、今の開発方式**という位置づけであり、
将来この方式自体が別のものに進化する可能性がある。

```
提案 → Backlog → 設計/実装（Technical Lead） → レビュー（Founder）
  → 公開判断（Founder + Product Lead） → 運用（Product Lead）
  → 数字を見る（Product Lead） → Backlogへ還元 → （ループ）
```

### 市場（数字）の扱い方

数字（検索流入・Analytics・反応）は、直感を置き換えるものではなく、
確認するものである。今の VIGOR LAB の規模では、サンプル数が
小さいことを常に意識する。DCAp の「Check」を、サービス全体に
適用したものと捉える。

---

## Documents

### 文書体系

```
VIGOR LAB Charter  ←→  Roles.md
  （組織原則・長期不変）    （現在の担当・可変）
        ↓ 両方が適用される
     VISION.md（プロダクトごと）
        ↓ 詳細化
     Backlog.md（プロダクトごと）
        ↓ 実務ルール
     CLAUDE.md（実装者への手順書）
```

### 非重複ルール

- Charter は担当者名・プロダクト名を書かない
- Roles.md は組織原則を書かない
- VISION.md は組織原則・開発方式を書かない（Charterへ委ねる）。
  Mission も持たない（Charterに一つだけ存在する）
- CLAUDE.md は組織原則・プロダクト哲学を書かない（実務手順のみ）

### Non-Goals

- 特定のプロダクトの仕様・ブランド・優先順位は本書で扱わない
  （VISION.md・Backlog.mdへ）
- 実装の具体的な手順は本書で扱わない（CLAUDE.mdへ）
- 誰が現在どの役割かは本書で扱わない（Roles.mdへ）

---

## 変更履歴

```
v1  2026-07-14
    初版制定。Mission / Scope / Operating Principles /
    Decision Making / Development System / Documents を確立。
    Missionを VIGOR LAB全体で唯一のものとし、VISION.mdからは
    Missionを分離した。
```
