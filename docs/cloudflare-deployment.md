# Cloudflare deployment notes

このメモは、`kirinuki-search` を Cloudflare Workers + Static Assets で動かすために行った設定と、調査中に詰まった点の記録です。

## 構成

このアプリは Vite/Vue の静的フロントエンドを `dist/` にビルドし、Cloudflare Workers Static Assets で配信します。

API 呼び出しはブラウザから直接 `yt-streamback` に向けず、同一オリジンの `/api/search` を叩きます。`kirinuki-search` Worker が Cloudflare service binding 経由で `yt-streamback` Worker に中継します。

```txt
browser
  -> /api/search?q=VIDEO_ID
  -> kirinuki-search Worker
  -> SEARCH_SERVICE binding
  -> yt-streamback /search?video_id=VIDEO_ID
```

## Wrangler 設定

`wrangler.toml` の要点は以下です。

```toml
name = "kirinuki-search"
main = "./src/worker.ts"

[[services]]
binding = "SEARCH_SERVICE"
service = "yt-streamback"
remote = true

[assets]
directory = "./dist/"
not_found_handling = "single-page-application"
binding = "ASSETS"
run_worker_first = ["/api/*"]
```

`run_worker_first = ["/api/*"]` により、静的アセット配信より先に `/api/*` だけ Worker に通します。これで SPA の assets と API proxy を同じ Worker で扱えます。

`remote = true` はローカル開発時に `SEARCH_SERVICE` binding だけリモートの `yt-streamback` に接続するための設定です。現在の Wrangler では `wrangler dev --remote` より、binding 側に `remote = true` を置いて通常の `wrangler dev` を使う流れです。

## Worker の役割

`src/worker.ts` は薄い proxy です。

- `GET /api/search` だけを受ける
- `q` または `videoId` から YouTube video ID を読む
- video ID 形式を検証する
- `yt-streamback` が期待する `/search?video_id=...` に変換する
- `env.SEARCH_SERVICE.fetch()` で service binding 経由の内部 Worker 呼び出しを行う
- upstream が詰まった場合に 15 秒で `504` を返す

`https://yt-streamback/search` という URL は外部公開 URL として使っているわけではなく、service binding の `fetch()` に渡す Request URL です。

## フロントエンド側

`src/composables/searchApi.ts` は外部 API URL を環境変数で持たず、同一オリジンの API を呼びます。

```ts
const endpoint = new URL("/api/search", window.location.origin);
endpoint.searchParams.set("q", videoId);
const response = await fetch(endpoint);
```

これにより、ブラウザから見える API は常に `/api/search?q=...` になります。

## ローカル確認

Worker と static assets を含めて確認する場合は Vite dev server ではなく Wrangler を使います。

```sh
pnpm build
pnpm wrangler dev
```

別ターミナルで API を確認します。

```sh
curl -i --max-time 20 "http://localhost:8787/api/search?q=dQw4w9WgXcQ"
```

`http://localhost:5173/api/search...` は Vite dev server 側なので、この確認には使いません。

## デプロイ

`package.json` の `deploy` script は Workers Static Assets 用に `wrangler deploy` を使います。

```sh
pnpm deploy
```

内部では以下を実行します。

```sh
pnpm build && wrangler deploy
```

## 詰まった点

最初は Cloudflare Pages 前提で `pages_build_output_dir = "./dist"` と `wrangler pages deploy dist` を考えましたが、service binding と API proxy を同じ設定で扱うため、Workers Static Assets に寄せました。

`curl http://localhost:8787/api/search?q=...` が `404 Not Found` を返した原因は、`yt-streamback` 側の期待エンドポイントが違っていたことです。実際の `yt-streamback` は以下でした。

```txt
GET /search?video_id=VIDEO_ID
```

一時的に `/?videoId=VIDEO_ID` に転送していたため、`yt-streamback` から `Not Found` が返っていました。

また、`wrangler dev --remote` では service binding 呼び出しが返ってこない状態がありました。`[[services]]` に `remote = true` を追加し、通常の `wrangler dev` を使う構成に変更しました。

## 検証済み

```sh
pnpm build
pnpm test:unit -- --run
pnpm wrangler deploy --dry-run
```

`wrangler deploy --dry-run` は Worker, Assets, `SEARCH_SERVICE` binding を認識します。ローカルの sandbox 環境では Wrangler がホーム配下のログファイルを書けず `EPERM` を出すことがありますが、dry-run 自体は完了しています。
