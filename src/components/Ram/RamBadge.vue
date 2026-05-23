<script setup lang="ts">
import { computed, type CSSProperties } from "vue";

type Tone =
  | "primary"
  | "secondary"
  | "accent"
  | "sun"
  | "sky"
  | "coral"
  | "success"
  | "warning"
  | "danger"
  | "neutral";
type Variant = "soft" | "solid" | "outline" | "dot";

const props = withDefaults(
  defineProps<{
    tone?: Tone;
    variant?: Variant;
  }>(),
  { tone: "primary", variant: "soft" },
);

const toneVar = computed(() =>
  props.tone === "neutral" ? "var(--ram-muted)" : `var(--ram-${props.tone})`,
);

const rootStyle = computed<CSSProperties>(() => {
  const c = toneVar.value;
  if (props.variant === "soft") {
    return {
      background: `color-mix(in oklch, ${c} 15%, transparent)`,
      color: c,
      border: `1px solid color-mix(in oklch, ${c} 22%, transparent)`,
    };
  }
  if (props.variant === "solid") {
    return {
      background: `linear-gradient(135deg, ${c}, color-mix(in oklch, ${c}, #000 15%))`,
      color: "#fff",
      border: "1px solid transparent",
    };
  }
  if (props.variant === "outline") {
    return {
      background: "transparent",
      color: c,
      border: `1px solid color-mix(in oklch, ${c} 45%, transparent)`,
    };
  }
  return {
    background: "var(--ram-glass)",
    color: "var(--ram-text)",
    border: "1px solid var(--ram-glass-border)",
  };
});
</script>

<template>
  <span
    :class="['ram-badge', `ram-badge--${variant}`, `ram-badge--tone-${tone}`]"
    :style="rootStyle"
  >
    <span
      v-if="variant === 'dot'"
      class="ram-badge__dot"
      :style="{ background: toneVar, boxShadow: `0 0 8px ${toneVar}77` }"
    />
    <slot />
  </span>
</template>

<style scoped>
.ram-badge {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  gap: 6px;
  padding: 3px 10px;
  font-family: var(--ram-font-display);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  border-radius: var(--ram-radius-pill);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.ram-badge__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
</style>
