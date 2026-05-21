<script setup lang="ts">
import { computed, type CSSProperties } from "vue";

interface Tab {
  value: string;
  label: string;
}
type Tone = "primary" | "secondary" | "accent" | "sun" | "sky" | "coral";

const props = withDefaults(
  defineProps<{
    tabs: Tab[];
    modelValue: string;
    variant?: "segmented" | "underline";
    tone?: Tone;
  }>(),
  { variant: "segmented", tone: "primary" },
);

const emit = defineEmits<{ "update:modelValue": [string] }>();

const toneVar = computed(() => `var(--ram-${props.tone})`);

const select = (v: string) => emit("update:modelValue", v);

const segStyle = (active: boolean): CSSProperties =>
  active
    ? {
        background: `linear-gradient(135deg, color-mix(in oklch, ${toneVar.value} 87%, transparent), color-mix(in oklch, ${toneVar.value} 67%, transparent))`,
        color: "#fff",
        boxShadow: `0 4px 16px color-mix(in oklch, ${toneVar.value} 27%, transparent)`,
      }
    : {};
</script>

<template>
  <div v-if="variant === 'underline'" class="ram-tabs ram-tabs--underline">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      type="button"
      :class="['ram-tabs__tab', { 'ram-tabs__tab--active': tab.value === modelValue }]"
      :style="{ '--tone': toneVar }"
      @click="select(tab.value)"
    >
      {{ tab.label }}
      <span v-if="tab.value === modelValue" class="ram-tabs__indicator" />
    </button>
  </div>
  <div v-else class="ram-tabs ram-tabs--segmented">
    <div class="ram-tabs__backdrop" aria-hidden="true" />
    <button
      v-for="tab in tabs"
      :key="tab.value"
      type="button"
      :class="['ram-tabs__seg', { 'ram-tabs__seg--active': tab.value === modelValue }]"
      :style="segStyle(tab.value === modelValue)"
      @click="select(tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<style scoped>
.ram-tabs {
  font-family: var(--ram-font-display);
}

/* Underline */
.ram-tabs--underline {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--ram-border);
}

.ram-tabs__tab {
  position: relative;
  padding: 10px 16px;
  border: none;
  background: transparent;
  font-family: inherit;
  font-weight: 600;
  font-size: 13px;
  color: var(--ram-muted);
  cursor: pointer;
  transition: color var(--ram-motion-fast);
}

.ram-tabs__tab--active {
  color: var(--tone);
}

.ram-tabs__indicator {
  position: absolute;
  bottom: -1px;
  left: 10px;
  right: 10px;
  height: 2px;
  border-radius: 2px;
  background: var(--tone);
  box-shadow: 0 0 12px color-mix(in oklch, var(--tone) 33%, transparent);
}

/* Segmented */
.ram-tabs--segmented {
  display: inline-flex;
  gap: 3px;
  padding: 4px;
  position: relative;
  isolation: isolate;
  border: 1px solid var(--ram-glass-border);
  border-radius: var(--ram-radius-pill);
}

.ram-tabs__backdrop {
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  background: var(--ram-glass);
  backdrop-filter: blur(16px) saturate(1.4);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
  pointer-events: none;
}

.ram-tabs__seg {
  position: relative;
  z-index: 1;
  padding: 7px 16px;
  border: none;
  border-radius: var(--ram-radius-pill);
  background: transparent;
  font-family: inherit;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.01em;
  color: var(--ram-muted);
  cursor: pointer;
  transition: all var(--ram-motion-fast);
}

.ram-tabs__seg--active {
  color: #fff;
}
</style>
