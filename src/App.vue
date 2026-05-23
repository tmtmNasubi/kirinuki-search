<script setup lang="ts">
import RamInputForm from "./components/Ram/RamInputForm.vue";
import RamMixedHeading from "./components/Ram/RamMixedHeading.vue";
import RamBadge from "./components/Ram/RamBadge.vue";
import { ref } from "vue";
import { getClips, type SearchResult } from "./composables/searchApi";
import ClipCard from "./components/ClipCard.vue";

const search = async (url: string) => {
  searchError.value = undefined;
  isSearching.value = true;

  try {
    clips.value = await getClips(url);
  } catch (error) {
    clips.value = [];
    searchError.value =
      error instanceof Error ? error.message : "切り抜き検索に失敗しました。";
  } finally {
    isSearching.value = false;
  }
};

const clips = ref<SearchResult[]>([]);
const searchError = ref<string>();
const isSearching = ref(false);
</script>

<template>
  <main class="container">
    <section class="title">
      <div class="title__inner">
        <RamBadge tone="primary" variant="soft">v1.0 · 2026</RamBadge>
        <RamMixedHeading
          title="切り抜きサーチ"
          subtitle="あの配信の切り抜きを簡単サーチ"
          size="XL"
          as="h1"
        />
      </div>
    </section>
    <RamInputForm
      label="配信のURLを入力"
      placeholder="https://www.youtube.com/watch?v=XXXXXXXXXXX"
      action-label="検索"
      type="search"
      inputmode="url"
      autocomplete="url"
      :error="searchError"
      :loading="isSearching"
      @submit="search"
    />
    <div v-if="clips.length" class="clips">
      <ClipCard v-for="clip in clips" :key="clip.id.videoId" :clip="clip" />
    </div>
    <footer class="footer">
      <div class="footer__brand">
        <span class="footer__label">KIRINUKI SEARCH</span>
        <p class="footer__copy">
          配信URLから関連する切り抜きを探すためのシンプルな検索ツールです。
        </p>
        <a
          href="https://github.com/tmtmNasubi/kirinuki-search"
          target="_blank"
          rel="noreferrer"
          class="footer__link"
        >
          GitHub
        </a>
        <p class="footer__meta">© 2026 Kirinuki Search / Nasubit</p>
      </div>
    </footer>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: var(--ram-space-7);
  padding: var(--ram-space-4);
  margin-inline: auto;
  min-height: 100vh;
}

.title {
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: center;
  border-radius: var(--ram-radius-lg);
  overflow: hidden;
  padding: var(--ram-space-8) var(--ram-space-4);
}

.title__inner {
  position: relative;
  z-index: 1;
  display: grid;
}

.clips {
  display: flex;
  flex-direction: column;
  gap: var(--ram-space-4);
}

.footer {
  display: grid;
  gap: var(--ram-space-4);
  margin-top: auto;
  padding-block: var(--ram-space-6) var(--ram-space-2);
  border-top: 1px solid var(--ram-border);
  color: var(--ram-muted);
}

.footer__brand {
  display: grid;
  gap: var(--ram-space-2);
}

.footer__label {
  width: fit-content;
  font-family: var(--ram-font-display);
  font-size: 11px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--ram-primary);
  letter-spacing: 0.07em;
}

.footer__copy,
.footer__meta {
  margin: 0;
  font-size: 13px;
  line-height: 1.7;
}

.footer__link {
  color: var(--ram-text-soft);
  font-family: var(--ram-font-display);
  font-size: 12px;
  font-weight: 600;
  line-height: 1.4;
}

.footer__meta {
  color: var(--ram-subtle);
}

@media (min-width: 768px) {
  .container {
    gap: var(--ram-space-10);
    padding: var(--ram-space-6);
    max-width: 1120px;
  }
  .title {
    min-height: 25svh;
    padding: var(--ram-space-10) var(--ram-space-6);
  }
  .title__inner {
    gap: var(--ram-space-5);
  }
  .footer {
    grid-template-columns: 1fr auto;
    align-items: end;
    padding-block-start: var(--ram-space-8);
  }
  .footer__meta {
    grid-column: 1 / -1;
  }
}
</style>
