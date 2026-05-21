# Ramune UI Design Contract

**Profile:** media / app hybrid（ブログ・記事メディア + 個人開発アプリ）
**Locale:** ja-JP + en（和欧混植）
**Version:** 2.0 — 2026-04-26
**Status:** Draft / Design Contract
**Prefix:** `ram-`

---

## 0. 設計の立場

このドキュメントは、Ramune UI Design System の設計契約である。
Ramune UI は「かわいい」「ポップ」「ガラス感」「多色」を単なる装飾として扱わない。タイポグラフィ、色、余白、角丸、モーション、ライト/ダークモードを、AI・実装者・レビュー担当者が再現できる **測定可能な値とルール** として定義する。

Ramune UI は [jp-ui-contracts](https://github.com/hirokaji/jp-ui-contracts) の思想を参考にしつつ、次の前提で設計する。

- 主言語は日本語。
- 英語は構造・技術感・ブランド感・余韻を補助するために使う。
- 見た目の楽しさより先に、日本語UIとしての読みやすさを保証する。
- コンポーネントは将来的に Web Components / Lit へ移植できる独立性を保つ。
- ライトモードを主役として設計し、ダークモードはUXへの配慮として提供する。

### ブランドメタファー

Ramune UI の名前は日本の夏祭りの定番ソーダ「ラムネ」に由来する。
ラムネ瓶の構造がデザインシステムのメタファーになっている。

| ラムネの要素         | デザインシステムとの対応     |
| -------------------- | ---------------------------- |
| ガラスの瓶           | リキッドグラスUI             |
| 丸いビー玉           | 丸い角丸・ボタン             |
| カラフルなフレーバー | 多色パレット                 |
| 炭酸の泡             | ホバーアニメーション         |
| 夏祭りの遊び心       | ポップで親しみやすいデザイン |
| 栓を開ける「ポン！」 | インタラクションの小さな喜び |

---

## 1. Ramune UI の5原則

Ramune UI の設計判断は、常に次の5原則に照らして行う。
この5原則は、個別のコンポーネント、トークン、レイアウト、ドキュメントの変更よりも上位にある。

|  No | 原則                       | 英語補助                      | 判断基準                                           |
| --: | -------------------------- | ----------------------------- | -------------------------------------------------- |
|  01 | タイポグラフィが骨格       | Typography is the skeleton    | 装飾を外しても文字組だけで成立するか               |
|  02 | カラフル、でもルールがある | Colorful, but governed        | 色に役割があり、1画面の主役色が明確か              |
|  03 | 遊びは細部に宿す           | Delight lives in the details  | 遊びが内容理解や操作を邪魔していないか             |
|  04 | 一貫性は退屈じゃない       | Consistency ≠ Boring          | 同じルールを反復し、崩しに意図があるか             |
|  05 | ライトモードが主役         | Light first, dark as courtesy | ライトモードで完成し、ダークモードでも破綻しないか |

### 5原則とUI契約の関係

- **01 タイポグラフィが骨格**
  フォント、行間、改行、禁則処理、和欧混植の品質を最優先する。

- **02 カラフル、でもルールがある**
  色は言語ではなく役割に割り当てる。日本語・英語の違いを色で表現しない。

- **03 遊びは細部に宿す**
  ホバー、トランジション、絵文字、微細な影で遊ぶ。本文・フォーム・エラーでは控えめにする。

- **04 一貫性は退屈じゃない**
  英日混在の見せ方をコンポーネント化する。場当たり的に英語を混ぜない。

- **05 ライトモードが主役**
  ガラス表現はライトモードで最も美しく見えるように設計する。ダークモードは反転ではなくセマンティックトークンで対応する。

---

## 2. 和欧混植の基本方針

Ramune UI は、日本語UIに英語を混ぜる。
ただし、英語は日本語を置き換えるものではなく、構造・技術感・ブランド感・余韻を補助するレイヤーとして扱う。

### 言語の役割

| 種別           | 主言語    | 例                        | 方針                         |
| -------------- | --------- | ------------------------- | ---------------------------- |
| ナビゲーション | 日本語    | ホーム、記事、設定        | 原則日本語                   |
| 操作ボタン     | 日本語    | 保存、作成、公開、削除    | 原則日本語                   |
| フォームラベル | 日本語    | 表示名、APIキー名         | 原則日本語                   |
| エラー文       | 日本語    | 入力してください          | 原則日本語                   |
| 確認ダイアログ | 日本語    | 削除しますか？            | 原則日本語                   |
| セクション補助 | 英語可    | SETTINGS, COMPONENTS      | 短い英語ラベルを許容         |
| 技術用語       | 英語可    | API, Webhook, Token       | 一般的な用語は英語可         |
| 固有名詞       | 英語      | GitHub, Cloudflare, React | 翻訳しない                   |
| コード・ID     | 英語/記号 | userId, DATABASE_URL      | 等幅・折り返しルールを分ける |

### 推奨パターン

Ramune UI の見出しは、次の3層を標準とする。

```text
EYEBROW
日本語タイトル
English Subtitle
```

例:

```text
SETTINGS
GitHub連携
GitHub Integration
```

```text
COMPONENTS
ボタン
Button
```

```text
DESIGN SYSTEM
Ramune UIの設計原則
Design Principles
```

### 避ける表現

```text
Settings設定
Createする
Saveして閉じる
Userを追加
APIキーをGenerateする
```

### 設計判断

- 日本語は意味を伝える主役。
- 英語は構造・技術感・ブランド感・余韻を作る補助。
- 操作語は日本語に寄せる。
- 固有名詞・技術名詞は英語のまま扱う。
- 英語を装飾として過剰に使わない。

---

## 3. フォント戦略

### 基本原則

日本語と英語が同一画面に共存する状態でも違和感が出ないよう、フォントスタックの順序で文字ごとに自然に分担させる。

Ramune UI の原則01「タイポグラフィが骨格」により、フォントは装飾ではなくUIの構造として扱う。

### Font Stack

| Role              | Font stack                                                                                   | 用途                             | 理由                                                              |
| ----------------- | -------------------------------------------------------------------------------------------- | -------------------------------- | ----------------------------------------------------------------- |
| Display / Heading | `'Fredoka', 'Zen Kaku Gothic New', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', sans-serif`     | ヒーロー、見出し、カードタイトル | 英字は Fredoka、日本語は Zen Kaku Gothic New にフォールバックする |
| Body              | `'DM Sans', 'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', system-ui, sans-serif` | 本文、説明、UIラベル             | 英字は DM Sans、日本語は Noto Sans JP にフォールバックする        |
| Mono              | `'JetBrains Mono', 'Menlo', 'Consolas', 'Noto Sans JP', monospace`                           | コード、数値、ID、URL            | 等幅を優先しつつ、日本語混入時の豆腐化を避ける                    |

### 注意

`Zen Kaku Gothic New` を `Fredoka` より前に置くと、英字も Zen Kaku 側で描画される可能性が高い。
Fredoka の個性を活かす場合は、Display / Heading では `Fredoka` を先に置く。

### やってはいけないこと

- `font-family: 'Fredoka', sans-serif` のみ
  → 日本語がOSデフォルトに落ち、混植が崩れる。

- `font-family: 'Noto Sans JP', sans-serif` のみ
  → 欧文の表情が弱くなり、Ramune UIらしい軽さが消える。

- 無計画に4種類以上のフォントを混ぜる
  → 原則04「一貫性は退屈じゃない」に反する。

---

## 4. タイポグラフィスケール

### line-height

欧文フォントは ascender / descender により行内に自然な余白が生まれる。
一方で、日本語の全角グリフは矩形に近く、同じ `line-height` では詰まって見えやすい。
Ramune UI では、日本語を含むテキストを基準に line-height を設計する。

| Context               | line-height | 用途                           |
| --------------------- | ----------- | ------------------------------ |
| 欧文のみの大見出し    | 1.05–1.25   | ロゴ、短い英語タイトル         |
| 日本語を含む見出し    | 1.45–1.60   | Ramune UI標準の見出し          |
| 欧文本文              | 1.65        | Latin-only paragraph           |
| 日本語本文 / メディア | 1.85–1.95   | 記事・ブログ本文               |
| 日本語本文 / UI       | 1.65–1.75   | 管理画面、フォーム、カード説明 |
| 補足・メタ情報        | 1.55–1.70   | 日付、タグ、短い説明           |

### letter-spacing

日本語本文には原則として `letter-spacing` を付与しない。
日本語の文字には既にグリフ単位の空間があり、過剰な字間は読みにくさと素人感につながる。

```css
/* ✅ 正しい */
p {
  letter-spacing: 0;
}

/* ✅ 欧文大サイズのみ微調整可 */
.ram-display-latin {
  letter-spacing: -0.01em;
}

/* ✅ 短い英語ラベルのみ許容 */
.ram-label-en {
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

/* ❌ 日本語本文には使わない */
p {
  letter-spacing: 0.05em;
}
```

### Ramune UI Type Scale

| Token       | Size | Weight | line-height | tracking | 用途                    |
| ----------- | ---- | ------ | ----------- | -------- | ----------------------- |
| `displayXL` | 56px | 700    | 1.45        | -0.01em  | ヒーロータイトル        |
| `displayL`  | 44px | 700    | 1.45        | -0.01em  | ページ大見出し          |
| `displayM`  | 34px | 700    | 1.50        | 0        | セクション主題          |
| `headingL`  | 26px | 700    | 1.55        | 0        | 記事タイトル            |
| `headingM`  | 20px | 600    | 1.60        | 0        | カード見出し            |
| `headingS`  | 16px | 600    | 1.60        | 0        | サブ見出し              |
| `bodyL`     | 17px | 400    | 1.90        | 0        | 記事本文 / メディア     |
| `bodyM`     | 15px | 400    | 1.80        | 0        | 説明文                  |
| `bodyS`     | 13px | 400    | 1.70        | 0        | 補足・メタ情報          |
| `uiM`       | 14px | 400    | 1.60        | 0        | UI本文                  |
| `label`     | 11px | 600    | 1.40        | 0.07em   | ALL CAPS 英語ラベルのみ |
| `mono`      | 12px | 500    | 1.55        | 0        | コード・数値            |

### レスポンシブ補正

モバイル幅では、表示サイズを下げても line-height は詰めすぎない。

```css
@media (max-width: 640px) {
  .ram-display-xl {
    font-size: 40px;
    line-height: 1.45;
  }

  .ram-body-l {
    font-size: 16px;
    line-height: 1.85;
  }
}
```

---

## 5. 改行・禁則処理

### 基本方針

日本語UIでは、禁則処理と折り返し戦略がないと、句読点の孤立、1文字だけの行残り、長い英単語・URLのはみ出しが発生する。

Ramune UI では、次の方針を標準とする。

- 日本語は自然に折り返す。
- URL、ID、長い英単語ははみ出さない。
- `word-break: break-all` は原則禁止。
- 新しめのCSS値は `@supports` で段階的に適用する。

### 必須CSS

```css
html[lang="ja"] {
  line-break: strict;
  word-break: normal;
  overflow-wrap: anywhere;
  font-kerning: normal;
}

body {
  word-break: normal;
  overflow-wrap: anywhere;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  text-wrap: balance;
  word-break: normal;
  overflow-wrap: anywhere;
}

p,
li,
blockquote,
dd {
  word-break: normal;
  overflow-wrap: anywhere;
}

@supports (word-break: auto-phrase) {
  h1:lang(ja),
  h2:lang(ja),
  h3:lang(ja),
  h4:lang(ja),
  h5:lang(ja),
  h6:lang(ja),
  p:lang(ja),
  li:lang(ja),
  blockquote:lang(ja) {
    word-break: auto-phrase;
  }
}
```

### word-break の使い分け

| 値            | 用途                   | 判断                                            |
| ------------- | ---------------------- | ----------------------------------------------- |
| `normal`      | 基本値                 | 標準                                            |
| `auto-phrase` | 日本語見出し・本文     | 対応ブラウザで段階的に使用                      |
| `break-word`  | 局所的なfallback       | 必要な場合のみ使用                              |
| `break-all`   | 原則使用禁止           | 英単語やURLを不自然に切る                       |
| `keep-all`    | 日本語では原則使わない | CJK全般に見えても日本語UIには不向きなことが多い |

### URL・ID・コードの折り返し

```css
.ram-url,
.ram-code-token,
.ram-product-name,
.ram-inline-code {
  overflow-wrap: anywhere;
  word-break: normal;
}

.ram-inline-code {
  font-family: var(--ram-font-mono);
  font-size: 0.92em;
}
```

---

## 6. 和欧混植の品質チェック

以下の文字列を fixture として、主要コンポーネントで確認する。

```text
日本語のみ: タイポグラフィが骨格である
英語のみ: Typography is the skeleton
和欧混植: Ramune UI は CSS と React で動く
数字混植: 記事を 12 件読みました
URL混植: 詳細は https://ramune-ui.dev/docs を参照
長い英単語: backdropFilter の設定方法
技術語混植: Cloudflare Workers にデプロイする
コード混植: 環境変数 DATABASE_URL を設定する
```

### 和欧間のスペース

Ramune UI では、コンテンツ上の半角スペースは可読性を優先して判断する。

| 例                          | 判定 | 理由                             |
| --------------------------- | ---- | -------------------------------- |
| `Ramune UIはReactで動く`    | 許容 | 短文では自然                     |
| `Ramune UI は React で動く` | 推奨 | 視認性が高い                     |
| `Ramune UI　は`             | 禁止 | 全角スペースは混植のリズムを崩す |
| `APIキー`                   | 推奨 | 日本語UIで一般的                 |
| `API キー`                  | 許容 | 文脈によって可                   |
| `GitHub連携`                | 推奨 | UIラベルとして短く強い           |
| `GitHub 連携`               | 許容 | 見出しや本文では読みやすい       |

### 判断ルール

- UIラベルは短さと走査性を優先する。
- 本文は読みやすさを優先して半角スペースを入れてよい。
- 全角スペースは使わない。
- 固有名詞と日本語助詞の間は、文脈に応じて半角スペースを使う。

---

## 7. カラーシステム

### Brand Palette

Ramune UI のカラーパレットは、ラムネのフレーバーをメタファーとして命名する。

| Token       | Flavor           | Light     | Dark      | 役割                     |
| ----------- | ---------------- | --------- | --------- | ------------------------ |
| `primary`   | Ichigo（いちご） | `#FF3366` | `#FF4477` | 主要CTA・ブランド強調    |
| `secondary` | Grape（ぶどう）  | `#7C3AED` | `#9055FF` | 副次アクション・補助強調 |
| `accent`    | Melon（メロン）  | `#00B894` | `#00E5B0` | 成功・確認・ポジティブ   |
| `sun`       | Yuzu（ゆず）     | `#F59E0B` | `#FFBE2E` | 注意・暖かみ・祝祭感     |
| `sky`       | Soda（ソーダ）   | `#3B82F6` | `#5B9FFF` | 情報・リンク・クール系   |
| `coral`     | —                | `#EF4444` | `#FF7070` | エラー・危険・破壊的操作 |

### 原則

- 1画面で主役になる色は1つにする。
- 色は言語ではなく、役割に割り当てる。
- 日本語だから黒、英語だから紫、のような割り当てをしない。
- 状態表示、情報階層、CTAの強さを色で表現する。
- 装飾色と状態色を混同しない。

### Semantic Tokens

```ts
const semanticColors = {
  actionPrimary: "primary", // Ichigo
  actionSecondary: "secondary", // Grape
  success: "accent", // Melon
  warning: "sun", // Yuzu
  info: "sky", // Soda
  danger: "coral",
};
```

### コントラスト

- 本文テキストは WCAG AA 相当の 4.5:1 以上を目標にする。
- 大きい見出し・装飾ラベルでも 3:1 以上を目標にする。
- Glass 表面の上では、通常よりコントラストを強める。
- `muted` テキストを本文の代替として使わない。

---

## 8. グラデーションのルール

### 補色グラデーション禁止

補色に近い鮮やかな色同士をそのまま混ぜると、中間色が濁りやすい。
Ramune UI では、鮮やかな多色を使うが、グラデーションには制御を入れる。

```text
primary (#FF3366) + accent (#00B894)
→ 色相差が大きく、中間色が濁りやすいため原則禁止
```

### 許容グラデーション

| Token       | 組み合わせ              | 用途                             |
| ----------- | ----------------------- | -------------------------------- |
| `warmGrad`  | `primary` → `sun`       | CTA、ヒーロー装飾、祝祭感        |
| `coolGrad`  | `sky` → `secondary`     | 情報、技術感、クール系アクセント |
| `monoGrad`  | 単色 → 同色の透明度違い | カード、バッジ、ボーダー         |
| `glassGrad` | 白/黒の透明度違い       | Glass 表面、ハイライト           |

### 日本語見出しへのグラデーション文字

日本語の大サイズ見出しに `background-clip: text` のグラデーションを使う場合は慎重に判断する。
全角グリフでは細部が潰れやすく、背景との組み合わせによって可読性が落ちる。

原則:

- 日本語の本文・通常見出しにはグラデーション文字を使わない。
- ヒーローなど、短い日本語タイトルでは使用可。ただしコントラストと輪郭を確認する。
- 英語の短いロゴ・ラベル・装飾タイトルでは使用可。
- グラデーション文字を使う場合、背景はニュートラルにする。

---

## 9. Glass 表面

### 基本方針

Ramune UI の視覚的な個性は、ライトモード上の Glass 表面にある。
ラムネ瓶のガラスのように、透明感と色の透過を活かした表面設計を行う。
ただし、Glass は可読性を下げやすいため、用途別に表面を分ける。

### Surface Tokens

| Token           | 用途                     | 背景                  | テキスト可読性 |
| --------------- | ------------------------ | --------------------- | -------------- |
| `glassSubtle`   | 装飾、背景、軽いカード   | 透明度高め            | 長文不可       |
| `glassDefault`  | 通常カード、ナビ、チップ | 標準                  | 短文向け       |
| `glassReadable` | 本文、フォーム、説明     | 透明度低め / 強めの面 | 長文可         |
| `solidReadable` | エラー、確認、重要情報   | ほぼ不透明            | 最優先         |

### 実装方針

`backdrop-filter` は子要素のテキストそのものをぼかすわけではない。
ただし、背景の色や模様を透過して拾うため、テキストの背後が不安定になり、結果として読みづらくなることがある。

そのため、長文・フォーム・エラー・確認ダイアログでは、背景レイヤーと内容レイヤーを分け、内容レイヤーのコントラストを保証する。

```jsx
// ✅ 背景レイヤーと内容レイヤーを分離する
<div
  className="ram-glass"
  style={{ position: "relative", isolation: "isolate" }}
>
  <div className="ram-glass__backdrop" aria-hidden="true" />
  <div className="ram-glass__content">
    <p>テキスト</p>
  </div>
</div>
```

```css
.ram-glass {
  position: relative;
  isolation: isolate;
  border-radius: var(--ram-radius-lg);
  overflow: hidden;
}

.ram-glass__backdrop {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: var(--ram-glass-default);
  backdrop-filter: blur(24px) saturate(1.4);
  -webkit-backdrop-filter: blur(24px) saturate(1.4);
}

.ram-glass__content {
  position: relative;
  z-index: 1;
  color: var(--ram-text);
}
```

### 禁止

- 長文本文を `glassSubtle` に置く。
- エラー文を薄い `muted` で表示する。
- 背景blobと本文テキストのコントラストを確認しない。
- Glassの美しさを優先して可読性を犠牲にする。

---

## 10. コンポーネント設計方針

### 基本方針

Ramune UI のコンポーネントは、React / Vue / Svelte / Web Components へ移植できるように、見た目・状態・振る舞いを分離する。

- 見た目はトークンで表現する。
- 状態は props / attributes で表現する。
- グローバルなReact Contextに依存しすぎない。
- Web Components化を想定し、CSS Custom Propertiesでテーマを注入できるようにする。

### Theme Injection

React実装では `theme` prop または CSS Custom Properties を標準とする。
Contextはアプリ層で使用してよいが、低レベルコンポーネントの必須依存にしない。

```tsx
// ✅ props injection
<RamButton theme={theme} variant="primary">送信</RamButton>

// ✅ CSS Custom Properties
<RamButton style={{ "--ram-color-primary": theme.primary }}>
  送信
</RamButton>

// △ アプリ層では可。ただしUI部品の移植性は下がる
const theme = useTheme();
```

### 作るべき混植コンポーネント

| Component          | 役割                                                 |
| ------------------ | ---------------------------------------------------- |
| `RamMixedHeading`  | eyebrow / 日本語タイトル / 英語subtitle を標準化する |
| `RamProductName`   | GitHub, Cloudflare などの固有名詞を安定表示する      |
| `RamInlineCode`    | ID、環境変数、URL、コード片を安全に折り返す          |
| `RamActionButton`  | 操作語を日本語に寄せたボタンを提供する               |
| `RamReadableGlass` | 長文やフォームを置ける読みやすいGlass面を提供する    |
| `RamStatusBadge`   | 状態色とラベルを一貫して扱う                         |

### Button

ボタンの主ラベルは原則日本語にする。

```tsx
// ✅ 推奨
<RamButton>保存</RamButton>
<RamButton>APIキーを作成</RamButton>
<RamButton variant="danger">連携を解除</RamButton>

// ❌ 非推奨
<RamButton>Save</RamButton>
<RamButton>Createする</RamButton>
<RamButton>Delete API Keyする</RamButton>
```

### Heading

```tsx
<RamMixedHeading
  eyebrow="SETTINGS"
  title="GitHub連携"
  subtitle="GitHub Integration"
/>
```

### Form

フォームでは、ラベル・ヘルプ・エラーを日本語にする。

```tsx
<RamFormField
  label="APIキー名"
  help="管理画面上で識別するための名前です。"
  error="APIキー名を入力してください。"
/>
```

### Status Badge

状態は短い日本語を基本にする。

| 状態    | ラベル | 色               |
| ------- | ------ | ---------------- |
| success | 完了   | `accent` (Melon) |
| warning | 確認中 | `sun` (Yuzu)     |
| info    | 処理中 | `sky` (Soda)     |
| danger  | 失敗   | `coral`          |
| neutral | 下書き | `muted`          |

---

## 11. Motion / Delight

### 基本方針

Ramune UI の遊びは細部に宿す。
ラムネの栓を開けた瞬間の「ポン！」のような、小さな喜びをインタラクションに散りばめる。
モーションは、理解・操作・可読性を邪魔しない範囲で使う。

### 推奨

- ホバー時の軽い浮き上がり。
- 影・色・スケールの小さな変化。
- ページ表示時の控えめなスタガーアニメーション。
- アイコンや絵文字による親しみやすさ。
- 英語の補助ラベルをホバー時に少し見せる演出。

### 禁止

- すべての要素を同時にアニメーションさせる。
- 本文が揺れる・回転する・読みにくくなる演出。
- フォーム入力中に視線を奪う演出。
- エラーや警告に過剰な遊びを入れる。

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 12. Light / Dark Mode

### 基本方針

Ramune UI はライトモードを主役として設計する。
明るい陽射しの下でラムネが一番綺麗に見えるように、ライトモードでガラスの透明感が最も映える設計にする。
ダークモードは、ライトモードの反転ではなく、セマンティックトークンの別定義として提供する。

### Light First

- 最初にライトモードで完成させる。
- Glass 表面、背景blob、鮮やかな色はライトモードで最も美しく見えるようにする。
- ダークモードでは彩度・透明度・影を再調整する。
- ダークモードだけ別のデザイン言語にしない。

### Theme Token 例

```ts
const RAM_THEMES = {
  light: {
    bg: "#F0EDE8",
    text: "#1A1A2E",
    muted: "#5C5A6F",
    glass: "rgba(255,255,255,0.45)",
    glassStrong: "rgba(255,255,255,0.62)",
  },
  dark: {
    bg: "#0E0E1A",
    text: "#F0EEFF",
    muted: "#8B89A6",
    glass: "rgba(255,255,255,0.06)",
    glassStrong: "rgba(255,255,255,0.1)",
  },
};
```

### 禁止

```js
// ❌ ダークモード = 単純反転
background: isDark ? "#000" : "#fff";
color: isDark ? "#fff" : "#000";
```

```js
// ✅ セマンティックトークン
background: theme.bg;
color: theme.text;
```

---

## 13. Accessibility

### 基本方針

Ramune UI はポップである前に、読めて使えるUIである。
色、Glass、モーション、英語装飾は、アクセシビリティを満たす範囲で使用する。

### チェック項目

- 本文テキストのコントラスト比は 4.5:1 以上を目標にする。
- 大きな見出し・装飾ラベルも 3:1 以上を目標にする。
- 色だけで状態を伝えない。
- エラーにはアイコン・文言・色を併用する。
- フォーカスリングを消さない。
- `prefers-reduced-motion` に対応する。
- クリック可能領域は最低 40px 程度を確保する。
- 日本語ラベルをplaceholderだけで済ませない。

### フォーカス

```css
.ram-focusable:focus-visible {
  outline: 2px solid var(--ram-color-sky);
  outline-offset: 3px;
}
```

---

## 14. Validation チェックリスト

UIを生成・修正した後、以下を確認する。

### 5原則

- [ ] 文字組だけで情報階層が伝わる。
- [ ] 1画面の主役色が1つに絞られている。
- [ ] 遊びが本文理解や操作を邪魔していない。
- [ ] 余白・角丸・色・モーションのルールが一貫している。
- [ ] ライトモードで完成しており、ダークモードは反転ではなく再設計されている。

### タイポグラフィ

- [ ] 日本語を含む見出しの `line-height` が 1.45 以上。
- [ ] 日本語本文の `line-height` が UI では 1.65 以上、メディアでは 1.85 以上。
- [ ] 日本語本文に過剰な `letter-spacing` を付与していない。
- [ ] 短い英語ラベル以外に uppercase tracking を乱用していない。
- [ ] フォントフォールバックが DevTools で確認できる。

### 和欧混植

- [ ] 日本語のみ / 英語のみ / 和欧混植 の3パターンで崩れていない。
- [ ] GitHub、Cloudflare、React などの固有名詞が自然に読める。
- [ ] 長い英単語・URL・IDがはみ出していない。
- [ ] `word-break: break-all` を使っていない。
- [ ] 全角スペースを使っていない。

### カラー

- [ ] 色は言語ではなく役割に紐づいている。
- [ ] グラデーションが補色同士で濁っていない。
- [ ] 日本語本文にグラデーション文字を使っていない。
- [ ] コントラスト比を確認している。

### Glass

- [ ] 長文・フォーム・エラーを `glassSubtle` に置いていない。
- [ ] Glass 上の本文が背景blobに負けていない。
- [ ] `glassReadable` または `solidReadable` を適切に使っている。

### Components

- [ ] 操作ボタンの主ラベルが日本語になっている。
- [ ] 見出しは `eyebrow / title / subtitle` の標準構造を使っている。
- [ ] フォームのラベル・ヘルプ・エラーが日本語で明確に書かれている。
- [ ] 低レベルコンポーネントがReact Contextに強く依存していない。

### Accessibility

- [ ] キーボードフォーカスが見える。
- [ ] 色だけで状態を表現していない。
- [ ] `prefers-reduced-motion` に対応している。
- [ ] クリック領域が小さすぎない。

---

## 15. Fixture Matrix

最低限、以下の画面・部品を使ってレビューする。

| Fixture         | 内容                          | 重点確認                             |
| --------------- | ----------------------------- | ------------------------------------ |
| `mixed-heading` | 日本語タイトル + 英語subtitle | 改行、行間、フォント混植             |
| `article-card`  | 記事カード                    | Glass、本文、タグ、日付              |
| `settings-form` | 設定フォーム                  | ラベル、ヘルプ、エラー、IME入力      |
| `api-key-table` | APIキー一覧                   | 日本語ラベル、英語ID、数値、折り返し |
| `empty-state`   | 空状態                        | 英語装飾と日本語説明のバランス       |
| `danger-dialog` | 削除確認                      | 可読性、危険色、遊びの抑制           |
| `mobile-nav`    | モバイルナビ                  | 短いラベル、折り返し、タップ領域     |
| `theme-preview` | Light / Dark 比較             | Glass、コントラスト、色の再現性      |

---

## 16. 参考

- [jp-ui-contracts](https://github.com/hirokaji/jp-ui-contracts) — 日本語UIデザイン契約テンプレート
- Ramune UI の各コンポーネントは、本ドキュメントの5原則と Validation チェックリストに従って実装・レビューする。
