<script setup lang="ts">
import { computed, type CSSProperties } from "vue";

const props = withDefaults(
  defineProps<{
    hover?: boolean;
    strong?: boolean;
    inset?: number | string;
  }>(),
  {
    hover: false,
    strong: false,
    inset: 0,
  },
);

const rootStyle = computed<CSSProperties>(() => ({
  padding: typeof props.inset === "number" ? `${props.inset}px` : props.inset,
}));
</script>

<template>
  <div
    :class="['ram-glass', { 'ram-glass--hover': hover, 'ram-glass--strong': strong }]"
    :style="rootStyle"
  >
    <div class="ram-glass__backdrop" aria-hidden="true" />
    <div class="ram-glass__shine" aria-hidden="true" />
    <div class="ram-glass__content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ram-glass {
  position: relative;
  border-radius: var(--ram-radius-lg);
  border: 1px solid var(--ram-glass-border);
  box-shadow: var(--ram-shadow);
  overflow: hidden;
  isolation: isolate;
  transition:
    box-shadow var(--ram-motion-base),
    transform var(--ram-motion-base);
}

.ram-glass--hover:hover {
  box-shadow: var(--ram-shadow-hover);
  transform: translateY(-3px);
}

.ram-glass__backdrop {
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  background: var(--ram-glass);
  backdrop-filter: blur(24px) saturate(1.6);
  -webkit-backdrop-filter: blur(24px) saturate(1.6);
  pointer-events: none;
}

.ram-glass--strong .ram-glass__backdrop {
  background: var(--ram-glass-strong);
}

.ram-glass__shine {
  position: absolute;
  top: 0;
  left: 8%;
  right: 8%;
  height: 1px;
  z-index: 1;
  background: linear-gradient(90deg, transparent, var(--ram-glass-highlight), transparent);
  pointer-events: none;
}

.ram-glass__content {
  position: relative;
  z-index: 2;
  color: var(--ram-text);
}
</style>
