type Env = {
  SEARCH_SERVICE: Fetcher;
  TURNSTILE_SECRET_KEY: string;
};

const YOUTUBE_VIDEO_ID_PATTERN = /^[\w-]{11}$/;
const SEARCH_TIMEOUT_MS = 15_000;
const TURNSTILE_SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type SearchRequestBody = {
  videoId?: unknown;
  turnstileToken?: unknown;
};

type TurnstileSiteverifyResponse = {
  success: boolean;
  hostname?: string;
  action?: string;
  "error-codes"?: string[];
};

const json = (body: unknown, init?: ResponseInit): Response =>
  Response.json(body, {
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...init?.headers,
    },
    ...init,
  });

const readSearchBody = async (request: Request): Promise<SearchRequestBody | Response> => {
  try {
    return (await request.json()) as SearchRequestBody;
  } catch {
    return json({ message: "Invalid JSON request body" }, { status: 400 });
  }
};

const validateTurnstileToken = async (
  request: Request,
  env: Env,
  token: string,
): Promise<Response | undefined> => {
  if (!env.TURNSTILE_SECRET_KEY) {
    return json({ message: "Turnstile is not configured" }, { status: 500 });
  }

  let response: Response;
  try {
    response = await fetch(TURNSTILE_SITEVERIFY_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        secret: env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: request.headers.get("CF-Connecting-IP") ?? undefined,
      }),
    });
  } catch {
    return json({ message: "Turnstile verification unavailable" }, { status: 503 });
  }

  if (!response.ok) {
    return json({ message: "Turnstile verification failed" }, { status: 403 });
  }

  const result = (await response.json()) as TurnstileSiteverifyResponse;
  if (!result.success) {
    return json(
      {
        message: "Turnstile verification failed",
        errors: result["error-codes"] ?? [],
      },
      { status: 403 },
    );
  }

  const requestHostname = new URL(request.url).hostname;
  if (result.hostname && result.hostname !== requestHostname) {
    return json({ message: "Turnstile hostname mismatch" }, { status: 403 });
  }
};

const getSearchRequest = async (
  request: Request,
  env: Env,
): Promise<Request | Response> => {
  if (request.method !== "POST") {
    return json({ message: "Method Not Allowed" }, { status: 405 });
  }

  const url = new URL(request.url);

  if (url.pathname !== "/api/search") {
    return json({ message: "Not Found" }, { status: 404 });
  }

  const body = await readSearchBody(request);
  if (body instanceof Response) {
    return body;
  }

  const videoId = typeof body.videoId === "string" ? body.videoId : "";
  const turnstileToken =
    typeof body.turnstileToken === "string" ? body.turnstileToken : "";

  if (!YOUTUBE_VIDEO_ID_PATTERN.test(videoId)) {
    return json({ message: "Invalid YouTube video ID" }, { status: 400 });
  }

  if (!turnstileToken) {
    return json({ message: "Turnstile token is required" }, { status: 403 });
  }

  const turnstileError = await validateTurnstileToken(request, env, turnstileToken);
  if (turnstileError) {
    return turnstileError;
  }

  const upstreamUrl = new URL("https://yt-streamback/search");
  upstreamUrl.searchParams.set("video_id", videoId);

  return new Request(upstreamUrl, {
    method: "GET",
    headers: request.headers,
  });
};

export default {
  async fetch(request, env): Promise<Response> {
    const searchRequest = await getSearchRequest(request, env);

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
