<script setup lang="ts">
import type { SearchResult } from "@/composables/searchApi";
import { computed } from "vue";

const props = defineProps<{ clip: SearchResult }>();

const thumbnail = computed(() => {
  if (window.innerWidth < 768) return props.clip.snippet.thumbnails.default;
  else if (window.innerWidth < 1120)
    return props.clip.snippet.thumbnails.medium;
  else return props.clip.snippet.thumbnails.high;
});
</script>

<template>
  <div class="card">
    <div class="card__inner">
      <img :src="thumbnail.url" class="thumbnail" />
      <div class="card__text">{{ clip.snippet.title }}</div>
    </div>
  </div>
</template>

<style scoped>
.card {
  padding: var(--ram-space-2);
}

.card__inner {
  display: flex;
  gap: var(--ram-space-2);
}

.thumbnail {
  width: auto;
  aspect-ratio: auto;
  border-radius: var(--ram-radius-lg);
}
</style>
