import type { SearchResult } from "@/composables/searchApi";

export const dummyYoutubeSearchResults = [
  {
    kind: "youtube#searchResult",
    etag: "iCliaVr7ut2-XCrN3tz3vZK-eWA",
    id: {
      kind: "youtube#video",
      videoId: "VzoaTxlVHmA",
    },
    snippet: {
      publishedAt: new Date("2026-05-17T13:43:22Z"),
      channelId: "UCxzOEbkuQSxKUhwdgKQxkTA",
      title: "ホテルから帰らされる栞葉るり【にじさんじ切り抜き】",
      description:
        "にじフェス中間報告会【栞葉るり/にじさんじ】 https://www.youtube.com/live/QmUeVRvOCWI?si=m2uv1JBnVZi8zq9S #栞葉 ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/VzoaTxlVHmA/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/VzoaTxlVHmA/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/VzoaTxlVHmA/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "塩ラテ",
      liveBroadcastContent: "none",
      publishTime: new Date("2026-05-17T13:43:22Z"),
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "nB2Wq-AtLKqAXhx7WRN7jGiMItU",
    id: {
      kind: "youtube#video",
      videoId: "4co2DFB7C3w",
    },
    snippet: {
      publishedAt: new Date("2026-05-17T10:00:06Z"),
      channelId: "UCvBhQYAsxHE6KzKXZuHbr5w",
      title: "にじフェスでるるに会ったるり　#shorts #栞葉るり　#にじさんじ切り抜き",
      description:
        "元動画 https://www.youtube.com/live/QmUeVRvOCWI?si=YzASz5v3I2hlYBGl 栞葉るり ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/4co2DFB7C3w/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/4co2DFB7C3w/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/4co2DFB7C3w/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "リビング鉄塔",
      liveBroadcastContent: "none",
      publishTime: new Date("2026-05-17T10:00:06Z"),
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "_xMfshR2zk3zIMnv1qdbNMMpb7A",
    id: {
      kind: "youtube#video",
      videoId: "LYwWmeRG31A",
    },
    snippet: {
      publishedAt: new Date("2026-05-16T15:16:27Z"),
      channelId: "UCSdoKxhecA1Mw8GmYG241zw",
      title: "ねぇうざいって！#栞葉るり#鏑木ろこ#shorts",
      description: "https://www.youtube.com/live/QmUeVRvOCWI?si=pili6kKavb0pd_jF.",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/LYwWmeRG31A/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/LYwWmeRG31A/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/LYwWmeRG31A/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "可愛い切り抜き▷▶︎",
      liveBroadcastContent: "none",
      publishTime: new Date("2026-05-16T15:16:27Z"),
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "JfGT3dpGWpp_lJlcWnNAnDjj0XY",
    id: {
      kind: "youtube#video",
      videoId: "CxRcOg4rKlc",
    },
    snippet: {
      publishedAt: new Date("2026-05-17T10:00:17Z"),
      channelId: "UCg9CeykFGtRcpuUEpKUXxjQ",
      title:
        "にじフェスでホテルから追放されてしまう栞葉るり【栞葉るり切り抜き/にじさんじ切り抜き】",
      description:
        "本編はこちら↓ にじフェス中間報告会【栞葉るり/にじさんじ】 https://www.youtube.com/watch?v=QmUeVRvOCWI 効果音：効果 ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/CxRcOg4rKlc/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/CxRcOg4rKlc/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/CxRcOg4rKlc/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "にじさんじのClips【にじさんじ切り抜き】",
      liveBroadcastContent: "none",
      publishTime: new Date("2026-05-17T10:00:17Z"),
    },
  },
] satisfies SearchResult[];
