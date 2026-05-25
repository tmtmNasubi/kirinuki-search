/// <reference types="vite/client" />
/// <reference types="@cloudflare/workers-types" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_TURNSTILE_SITE_KEY?: string;
  readonly VITE_USE_REAL_SEARCH?: string;
}
