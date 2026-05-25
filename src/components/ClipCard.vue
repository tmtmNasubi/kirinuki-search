<script setup lang="ts">
import type { SearchResult } from "@/composables/searchApi";
import { computed } from "vue";
import { useWindowSize } from "@vueuse/core";
import RamGlass from "./Ram/RamGlass.vue";
import RamType from "./Ram/RamType.vue";
import RamBadge from "./Ram/RamBadge.vue";

const props = defineProps<{ clip: SearchResult }>();

const width = useWindowSize().width;

const url = `https://www.youtube.com/watch?v=${props.clip.id.videoId}`;

const channelUrl = `https://www.youtube.com/channel/${props.clip.snippet.channelId}`;

const titleValiant = computed(() => {
  return width.value < 1120 ? "headingS" : "headingL";
});
</script>

<template>
  <RamGlass hover strong>
    <a :href="url" target="_blank" class="card">
      <div class="card__inner">
        <img
          :src="props.clip.snippet.thumbnails.medium.url"
          class="thumbnail"
        />
        <div class="card__text">
          <RamType :variant="titleValiant">
            {{ clip.snippet.title }}
          </RamType>
          <a :href="channelUrl" target="_brank">
            <RamBadge tone="sky">
              {{ clip.snippet.channelTitle }}
            </RamBadge>
          </a>
        </div>
      </div>
    </a>
  </RamGlass>
</template>

<style scoped>
.card {
  padding: var(--ram-space-2);
  overflow: hidden;
  display: block;
}

.card__inner {
  display: flex;
  flex-direction: column;
  gap: var(--ram-space-2);
  width: auto;
  padding-bottom: var(--ram-space-2);
}

.card__text {
  display: flex;
  flex-direction: column;
  padding: var(--ram-space-2);
  gap: var(--ram-space-2);
}

.thumbnail {
  width: 100%;
  border-radius: var(--ram-radius-lg);
}

@media (min-width: 768px) {
  .card__inner {
    flex-direction: row;
  }
  .card__text {
    flex: 2;
  }
  .thumbnail {
    flex: 1;
    border-radius: var(--ram-radius-lg);
  }
}
</style>
