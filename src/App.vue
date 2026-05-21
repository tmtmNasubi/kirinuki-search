<script setup lang="ts">
import RamInputForm from "./components/Ram/RamInputForm.vue";
import RamMixedHeading from "./components/Ram/RamMixedHeading.vue";
import RamBadge from "./components/Ram/RamBadge.vue";
import { ref } from "vue";
import { getClips, type SearchResult } from "./composables/searchApi";
import RamGlass from "./components/Ram/RamGlass.vue";
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
  <main>
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
      <RamGlass v-for="clip in clips" :key="clip.kind">
        <ClipCard :clip="clip" />
      </RamGlass>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: var(--ram-space-7);
  padding: var(--ram-space-4);
  margin-inline: auto;
  min-height: 100vh;
}

@media (min-width: 768px) {
  main {
    gap: var(--ram-space-10);
    padding: var(--ram-space-6);
  }
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
  gap: var(--ram-space-4);
}

@media (min-width: 768px) {
  .title {
    min-height: 25svh;
    padding: var(--ram-space-10) var(--ram-space-6);
  }
  .title__inner {
    gap: var(--ram-space-5);
  }
}

.clips {
  display: flex;
  flex-direction: column;
  gap: var(--ram-space-4);
}
</style>
