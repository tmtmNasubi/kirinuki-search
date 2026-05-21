type Env = {
  SEARCH_SERVICE: Fetcher;
};

const YOUTUBE_VIDEO_ID_PATTERN = /^[\w-]{11}$/;
const SEARCH_TIMEOUT_MS = 15_000;

const json = (body: unknown, init?: ResponseInit): Response =>
  Response.json(body, {
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...init?.headers,
    },
    ...init,
  });

const getSearchRequest = (request: Request): Request | Response => {
  if (request.method !== "GET") {
    return json({ message: "Method Not Allowed" }, { status: 405 });
  }

  const url = new URL(request.url);

  if (url.pathname !== "/api/search") {
    return json({ message: "Not Found" }, { status: 404 });
  }

  const videoId = url.searchParams.get("q") ?? url.searchParams.get("videoId") ?? "";

  if (!YOUTUBE_VIDEO_ID_PATTERN.test(videoId)) {
    return json({ message: "Invalid YouTube video ID" }, { status: 400 });
  }

  const upstreamUrl = new URL("https://yt-streamback/search");
  upstreamUrl.searchParams.set("video_id", videoId);

  return new Request(upstreamUrl, request);
};

export default {
  async fetch(request, env): Promise<Response> {
    const searchRequest = getSearchRequest(request);

    if (searchRequest instanceof Response) {
      return searchRequest;
    }

    try {
      const response = await Promise.race([
        env.SEARCH_SERVICE.fetch(searchRequest),
        new Promise<Response>((_, reject) => {
          setTimeout(
            () => reject(new Error("Search service request timed out")),
            SEARCH_TIMEOUT_MS,
          );
        }),
      ]);

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown upstream error";

      return json(
        {
          message: "Search service request failed",
          detail: message,
        },
        { status: 504 },
      );
    }
  },
} satisfies ExportedHandler<Env>;
