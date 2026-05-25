type GtagCommand = "config" | "event" | "js";

type Gtag = (
  command: GtagCommand,
  targetId: string | Date,
  config?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
let isInitialized = false;

const isAnalyticsEnabled = () =>
  Boolean(measurementId) &&
  import.meta.env.PROD &&
  typeof window !== "undefined";

export const initializeAnalytics = () => {
  if (!isAnalyticsEnabled() || isInitialized) {
    return;
  }

  const gaMeasurementId = measurementId;
  if (!gaMeasurementId) {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args) => {
    window.dataLayer?.push(args);
  };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", gaMeasurementId);
  isInitialized = true;
};

export const trackSearch = (resultCount: number) => {
  if (!isAnalyticsEnabled()) {
    return;
  }

  window.gtag?.("event", "search", {
    search_term: "youtube_url",
    result_count: resultCount,
    has_results: resultCount > 0,
  });
};

export const trackSearchError = () => {
  if (!isAnalyticsEnabled()) {
    return;
  }

  window.gtag?.("event", "exception", {
    description: "search_failed",
    fatal: false,
  });
};
