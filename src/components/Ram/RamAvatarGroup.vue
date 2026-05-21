<script setup lang="ts">
import { computed, type CSSProperties } from "vue";

interface User {
  name?: string;
  src?: string;
  color?: string;
  status?: "online" | "away" | "busy" | "offline";
}

const props = withDefaults(
  defineProps<{
    users: User[];
    size?: number;
    max?: number;
  }>(),
  { size: 36, max: 4 },
);

const shown = computed(() => props.users.slice(0, props.max));
const extra = computed(() => Math.max(0, props.users.length - props.max));

const itemStyle = (i: number): CSSProperties => ({
  marginLeft: i === 0 ? "0" : `${-props.size * 0.33}px`,
  zIndex: shown.value.length - i,
  border: "2px solid var(--ram-bg)",
  borderRadius: "50%",
});

const extraStyle = computed<CSSProperties>(() => ({
  marginLeft: `${-props.size * 0.33}px`,
  width: `${props.size}px`,
  height: `${props.size}px`,
  fontSize: `${props.size * 0.32}px`,
  border: "2px solid var(--ram-bg)",
}));
</script>

<template>
  <div class="ram-avatar-group">
    <div v-for="(u, i) in shown" :key="i" class="ram-avatar-group__item" :style="itemStyle(i)">
      <RamAvatar v-bind="u" :size="size" />
    </div>
    <div v-if="extra > 0" class="ram-avatar-group__extra" :style="extraStyle">+{{ extra }}</div>
  </div>
</template>

<style scoped>
.ram-avatar-group {
  display: inline-flex;
  align-items: center;
}

.ram-avatar-group__extra {
  border-radius: 50%;
  background: var(--ram-glass-strong);
  color: var(--ram-text);
  font-family: var(--ram-font-display);
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>
