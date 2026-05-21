<script setup lang="ts">
import { computed, type CSSProperties } from "vue";

type Status = "online" | "away" | "busy" | "offline";

const props = withDefaults(
  defineProps<{
    name?: string;
    size?: number;
    color?: string;
    status?: Status;
    src?: string;
  }>(),
  {
    name: "",
    size: 36,
    color: undefined,
    status: undefined,
    src: undefined,
  },
);

const initials = computed(() => {
  const parts = props.name
    .split(/\s+/)
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2);
  return parts.join("").toUpperCase() || "?";
});

const hueVars = [
  "--ram-primary",
  "--ram-secondary",
  "--ram-accent",
  "--ram-sun",
  "--ram-sky",
  "--ram-coral",
];
const seed = computed(() => [...props.name].reduce((a, c) => a + c.charCodeAt(0), 0));
const fallbackColor = computed(() => `var(${hueVars[seed.value % hueVars.length]})`);
const ringColor = computed(() => props.color || fallbackColor.value);

const rootStyle = computed<CSSProperties>(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
}));

const shellStyle = computed<CSSProperties>(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  fontSize: `${props.size * 0.38}px`,
  background: props.src
    ? "transparent"
    : `linear-gradient(135deg, ${ringColor.value}, color-mix(in oklch, ${ringColor.value}, var(--ram-secondary) 40%))`,
  boxShadow: `0 2px 10px color-mix(in oklch, ${ringColor.value} 33%, transparent), inset 0 -2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.35)`,
}));

const statusStyle = computed<CSSProperties>(() => {
  const map: Record<Status, string> = {
    online: "var(--ram-success)",
    away: "var(--ram-warning)",
    busy: "var(--ram-danger)",
    offline: "var(--ram-subtle)",
  };
  const c = map[props.status as Status];
  const dot = props.size * 0.3;
  return {
    width: `${dot}px`,
    height: `${dot}px`,
    background: c,
    border: "2px solid var(--ram-bg)",
    boxShadow: `0 0 6px ${c}66`,
  };
});
</script>

<template>
  <div class="ram-avatar" :style="rootStyle">
    <div class="ram-avatar__shell" :style="shellStyle">
      <img v-if="src" :src="src" :alt="name" class="ram-avatar__img" />
      <template v-else>{{ initials }}</template>
    </div>
    <div v-if="status" class="ram-avatar__status" :style="statusStyle" />
  </div>
</template>

<style scoped>
.ram-avatar {
  position: relative;
  display: inline-block;
}

.ram-avatar__shell {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: var(--ram-font-display);
  font-weight: 600;
  overflow: hidden;
}

.ram-avatar__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ram-avatar__status {
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 50%;
}
</style>
