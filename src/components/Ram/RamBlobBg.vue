<script setup lang="ts">
import type { CSSProperties } from "vue";

interface Blob {
  color: string;
  size: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

const props = withDefaults(
  defineProps<{
    seed?: number;
  }>(),
  { seed: 0 },
);

const blobs: Blob[] = [
  { color: "var(--ram-primary)", size: 440, top: "-12%", left: "8%" },
  { color: "var(--ram-secondary)", size: 380, top: "18%", right: "4%" },
  { color: "var(--ram-accent)", size: 320, bottom: "18%", left: "3%" },
  { color: "var(--ram-sun)", size: 300, bottom: "4%", right: "14%" },
  { color: "var(--ram-sky)", size: 360, top: "45%", left: "38%" },
];

const blobStyle = (b: Blob, i: number): CSSProperties => ({
  width: `${b.size}px`,
  height: `${b.size}px`,
  top: b.top,
  left: b.left,
  right: b.right,
  bottom: b.bottom,
  background: `radial-gradient(circle at 30% 30%, ${b.color} 0%, transparent 70%)`,
  animation: `ram-blob ${12 + i * 2}s ease-in-out ${i * 0.7 + props.seed}s infinite alternate`,
});
</script>

<template>
  <div class="ram-blob-bg" aria-hidden="true">
    <div
      v-for="(blob, i) in blobs"
      :key="i"
      class="ram-blob-bg__blob"
      :style="blobStyle(blob, i)"
    />
  </div>
</template>

<style scoped>
.ram-blob-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.ram-blob-bg__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.35;
  mix-blend-mode: multiply;
}

:global(html.ram-dark) .ram-blob-bg__blob {
  mix-blend-mode: screen;
}
</style>
