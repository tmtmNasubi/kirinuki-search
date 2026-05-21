<script setup lang="ts">
import { computed } from "vue";

type Variant = "primary" | "secondary" | "ghost" | "icon" | "danger";
type Size = "sm" | "md" | "lg";
type Component = "button" | "link";

const props = withDefaults(
  defineProps<{
    variant?: Variant;
    size?: Size;
    icon?: string;
    disabled?: boolean;
    as?: Component;
  }>(),
  {
    variant: "primary",
    size: "md",
    icon: undefined,
    disabled: false,
    as: "button",
  },
);

const emit = defineEmits<{ click: [MouseEvent] }>();

const isDisabled = computed(() => (props.as === "button" ? props.disabled : undefined));

const handleClick = (e: MouseEvent) => {
  if (props.disabled) return;
  emit("click", e);
};
</script>

<template>
  <button
    v-if="props.as === 'button'"
    :class="[
      'ram-button',
      `ram-button--${variant}`,
      `ram-button--${size}`,
      { 'ram-button--icon': variant === 'icon' },
    ]"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <span v-if="icon" class="ram-button__icon">{{ icon }}</span>
    <slot />
  </button>
  <NuxtLink
    v-else
    :class="[
      'ram-button',
      `ram-button--${variant}`,
      `ram-button--${size}`,
      { 'ram-button--icon': variant === 'icon' },
    ]"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <span v-if="icon" class="ram-button__icon">{{ icon }}</span>
    <slot />
  </NuxtLink>
</template>

<style scoped>
.ram-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--ram-font-display);
  font-weight: 600;
  letter-spacing: 0.01em;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all var(--ram-motion-fast);
  text-decoration: none;
}

.ram-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ram-button:not(:disabled):hover {
  transform: translateY(-1px);
}
.ram-button:not(:disabled):active {
  transform: translateY(1px) scale(0.98);
}

.ram-button__icon {
  line-height: 1;
}

/* Sizes */
.ram-button--sm {
  padding: 6px 14px;
  font-size: 12px;
  height: 32px;
  gap: 6px;
  border-radius: var(--ram-radius-sm);
}
.ram-button--md {
  padding: 11px 20px;
  font-size: 14px;
  height: 44px;
  gap: 8px;
  border-radius: var(--ram-radius-md);
}
.ram-button--lg {
  padding: 13px 28px;
  font-size: 15px;
  height: 48px;
  gap: 10px;
  border-radius: var(--ram-radius-md);
}

.ram-button--sm .ram-button__icon {
  font-size: 14px;
}
.ram-button--md .ram-button__icon {
  font-size: 15px;
}
.ram-button--lg .ram-button__icon {
  font-size: 17px;
}

/* Icon-only override: square */
.ram-button--icon {
  padding: 0;
}
.ram-button--icon.ram-button--sm {
  width: 32px;
}
.ram-button--icon.ram-button--md {
  width: 44px;
}
.ram-button--icon.ram-button--lg {
  width: 48px;
}

/* Variants */
.ram-button--primary {
  background: linear-gradient(135deg, var(--ram-primary), var(--ram-sun));
  color: #fff;
  box-shadow: 0 4px 14px color-mix(in oklch, var(--ram-primary) 33%, transparent);
}
.ram-button--primary:not(:disabled):hover {
  box-shadow: 0 10px 28px color-mix(in oklch, var(--ram-primary) 55%, transparent);
}

.ram-button--secondary {
  background: var(--ram-glass-strong);
  color: var(--ram-text);
  border-color: var(--ram-glass-border);
  backdrop-filter: blur(16px) saturate(1.4);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
  box-shadow: var(--ram-shadow);
}
.ram-button--secondary:not(:disabled):hover {
  box-shadow: var(--ram-shadow-hover);
}

.ram-button--ghost {
  background: transparent;
  color: var(--ram-text);
}
.ram-button--ghost:not(:disabled):hover {
  background: var(--ram-glass-inner);
  border-color: var(--ram-glass-border);
}

.ram-button--icon {
  background: var(--ram-glass);
  color: var(--ram-text);
  border-color: var(--ram-glass-border);
  backdrop-filter: blur(16px) saturate(1.4);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
}
.ram-button--icon:not(:disabled):hover {
  background: var(--ram-glass-strong);
  box-shadow: var(--ram-shadow);
}

.ram-button--danger {
  background: linear-gradient(
    135deg,
    var(--ram-coral),
    color-mix(in oklch, var(--ram-coral), #000 18%)
  );
  color: #fff;
  box-shadow: 0 4px 14px color-mix(in oklch, var(--ram-coral) 33%, transparent);
}
.ram-button--danger:not(:disabled):hover {
  box-shadow: 0 10px 28px color-mix(in oklch, var(--ram-coral) 55%, transparent);
}
</style>
