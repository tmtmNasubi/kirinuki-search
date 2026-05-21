<script setup lang="ts">
import { computed, type CSSProperties } from "vue";

const props = withDefaults(
  defineProps<{
    color?: string;
    padding?: number | string;
  }>(),
  {
    color: "var(--ram-primary)",
    padding: 0,
  },
);

const rootStyle = computed<CSSProperties>(() => ({
  background: `linear-gradient(135deg, ${props.color}66 0%, transparent 30%, transparent 70%, ${props.color}44 100%)`,
}));

const sheenStyle = computed<CSSProperties>(() => ({
  background: `conic-gradient(from 210deg at 80% 10%, ${props.color}00 0deg, ${props.color}22 60deg, ${props.color}00 120deg)`,
}));

const contentStyle = computed<CSSProperties>(() => ({
  padding: typeof props.padding === "number" ? `${props.padding}px` : props.padding,
}));
</script>

<template>
  <div class="ram-prism" :style="rootStyle">
    <div class="ram-prism__backdrop" aria-hidden="true" />
    <div class="ram-prism__shine" aria-hidden="true" />
    <div class="ram-prism__sheen" aria-hidden="true" :style="sheenStyle" />
    <div class="ram-prism__content" :style="contentStyle">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ram-prism {
  position: relative;
  border-radius: var(--ram-radius-lg);
  padding: 1px;
  isolation: isolate;
}

.ram-prism__backdrop {
  position: absolute;
  inset: 1px;
  z-index: 0;
  border-radius: calc(var(--ram-radius-lg) - 1px);
  background: var(--ram-glass);
  backdrop-filter: blur(20px) saturate(1.5);
  -webkit-backdrop-filter: blur(20px) saturate(1.5);
  pointer-events: none;
}

.ram-prism__shine {
  position: absolute;
  top: 1px;
  left: 5%;
  right: 5%;
  height: 1px;
  z-index: 1;
  background: linear-gradient(90deg, transparent, var(--ram-glass-highlight), transparent);
  pointer-events: none;
}

.ram-prism__sheen {
  position: absolute;
  inset: 1px;
  z-index: 1;
  pointer-events: none;
  border-radius: calc(var(--ram-radius-lg) - 1px);
  mix-blend-mode: screen;
}

.ram-prism__content {
  position: relative;
  z-index: 2;
  border-radius: calc(var(--ram-radius-lg) - 1px);
  overflow: hidden;
}
</style>
