# kirinuki-search

配信URLから関連するYouTube切り抜きを検索するVue/Viteアプリです。

フロントエンドは静的アセットとしてビルドし、Cloudflare Workers Static Assetsで配信します。検索APIはブラウザから外部サービスを直接叩かず、同一オリジンの`POST /api/search`を経由してCloudflare service bindingの`yt-streamback`へ中継します。

## Stack

- Vue 3
- Vite
- TypeScript
- Cloudflare Workers Static Assets
- Cloudflare Turnstile
- Vitest

## Requirements

- Node.js 24
- pnpm 10.11.1
- Wrangler

## Setup

```sh
pnpm install
cp .env.example .env.local
```

`.env.local`には必要に応じて以下を設定します。

```sh
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_TURNSTILE_SITE_KEY=...
VITE_USE_REAL_SEARCH=false
```

通常のVite開発サーバーでは、`VITE_USE_REAL_SEARCH=true`を指定しない限りダミー検索結果を返します。
`VITE_GA_MEASUREMENT_ID`を設定すると、本番ビルドでGoogle Analytics 4のページビューと検索イベントを計測します。未設定または開発環境では送信しません。
Cookie利用については、`public/privacy.html`のプライバシーポリシーで告知します。

## Development

```sh
pnpm dev
```

実際のWorker、Turnstile検証、`SEARCH_SERVICE` bindingを含めて確認する場合はWranglerを使います。

```sh
pnpm build
pnpm wrangler dev
```

Workerでは`TURNSTILE_SECRET_KEY`が必要です。

```sh
wrangler secret put TURNSTILE_SECRET_KEY
```

## Scripts

```sh
pnpm dev          # Vite dev server
pnpm build        # type-check + production build
pnpm test:unit    # unit tests
pnpm lint         # oxlint + eslint
pnpm deploy       # build + wrangler deploy
```

## API

フロントエンドは同一オリジンのAPIだけを呼びます。

```txt
POST /api/search
```

Request body:

```json
{
  "videoId": "dQw4w9WgXcQ",
  "turnstileToken": "TOKEN"
}
```

WorkerはTurnstile tokenを検証したあと、service binding経由で`yt-streamback`の`GET /search?video_id=...`へ中継します。

## Deployment

本番はCloudflare Workers Static Assetsで配信します。

```sh
pnpm deploy
```

Cloudflare構成やローカル確認の詳細は[docs/cloudflare-deployment.md](docs/cloudflare-deployment.md)を参照してください。
