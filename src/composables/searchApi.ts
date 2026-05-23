import { dummyYoutubeSearchResults } from "@/mocks/youtubeSearchResults";

export type SearchResult = {
  kind: string;
  etag: string;
  id: VideoId;
  snippet: VideoSnippet;
};

export type VideoId = {
  kind: string;
  videoId: string;
};

export type VideoSnippet = {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: Date;
};

export type Thumbnails = {
  default: ThumbnailImage;
  medium: ThumbnailImage;
  high: ThumbnailImage;
};

export type ThumbnailImage = {
  url: string;
  width: number;
  height: number;
};

const YOUTUBE_VIDEO_ID_PATTERN = /^[\w-]{11}$/;

export const extractYouTubeVideoId = (input: string): string => {
  const value = input.trim();

  if (!value) {
    throw new Error("YouTubeのURLを入力してください。");
  }

  if (YOUTUBE_VIDEO_ID_PATTERN.test(value)) {
    return value;
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(value);
  } catch {
    throw new Error("有効なYouTube URLを入力してください。");
  }

  const hostname = parsedUrl.hostname.replace(/^www\./, "").toLowerCase();
  const pathnameParts = parsedUrl.pathname.split("/").filter(Boolean);

  if (hostname === "youtu.be") {
    const videoId = pathnameParts[0];
    if (videoId && YOUTUBE_VIDEO_ID_PATTERN.test(videoId)) {
      return videoId;
    }
  }

  if (
    hostname === "youtube.com" ||
    hostname === "m.youtube.com" ||
    hostname === "music.youtube.com"
  ) {
    const watchVideoId = parsedUrl.searchParams.get("v");
    if (watchVideoId && YOUTUBE_VIDEO_ID_PATTERN.test(watchVideoId)) {
      return watchVideoId;
    }

    const videoPathPrefixes = new Set(["embed", "shorts", "live", "v"]);
    const [prefix, videoId] = pathnameParts;
    if (
      prefix &&
      videoPathPrefixes.has(prefix) &&
      videoId &&
      YOUTUBE_VIDEO_ID_PATTERN.test(videoId)
    ) {
      return videoId;
    }
  }

  throw new Error("YouTubeのvideoIdを取得できませんでした。");
};

const normalizeSearchResult = (result: SearchResult): SearchResult => ({
  ...result,
  snippet: {
    ...result.snippet,
    publishedAt: new Date(result.snippet.publishedAt),
    publishTime: new Date(result.snippet.publishTime),
  },
});

const shouldUseDummySearch =
  import.meta.env.DEV && import.meta.env.VITE_USE_REAL_SEARCH !== "true";

export const getClips = async (url: string): Promise<SearchResult[]> => {
  const videoId = extractYouTubeVideoId(url);

  if (shouldUseDummySearch) {
    return dummyYoutubeSearchResults.map(normalizeSearchResult);
  }

  const endpoint = new URL("/api/search", window.location.origin);
  endpoint.searchParams.set("q", videoId);
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(
      `切り抜き検索APIの呼び出しに失敗しました。status: ${response.status}`,
    );
  }

  const data = (await response.json()) as
    | SearchResult[]
    | { items?: SearchResult[] };
  const results = Array.isArray(data) ? data : (data.items ?? []);
  return results.map(normalizeSearchResult);
};
