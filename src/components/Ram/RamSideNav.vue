<script setup lang="ts">
type Tone = "primary" | "secondary" | "accent" | "sun" | "sky" | "coral" | "neutral";

interface Item {
  id: string;
  label: string;
  icon?: string;
  badge?: string;
  badgeTone?: Tone;
}

interface Section {
  title: string;
  items: Item[];
}

defineProps<{
  sections: Section[];
  active?: string;
}>();

const emit = defineEmits<{ nav: [string] }>();
</script>

<template>
  <div class="ram-sidenav">
    <div class="ram-sidenav__backdrop" aria-hidden="true" />
    <div class="ram-sidenav__inner">
      <div
        v-for="(section, si) in sections"
        :key="si"
        :class="[
          'ram-sidenav__section',
          { 'ram-sidenav__section--last': si === sections.length - 1 },
        ]"
      >
        <div class="ram-sidenav__title">{{ section.title }}</div>
        <button
          v-for="item in section.items"
          :key="item.id"
          type="button"
          :class="['ram-sidenav__item', { 'ram-sidenav__item--active': item.id === active }]"
          @click="emit('nav', item.id)"
        >
          <span v-if="item.id === active" class="ram-sidenav__bar" />
          <span class="ram-sidenav__icon">{{ item.icon }}</span>
          <span class="ram-sidenav__label">{{ item.label }}</span>
          <RamBadge
            v-if="item.badge"
            :tone="item.badgeTone || 'primary'"
            variant="soft"
            class="ram-sidenav__badge"
            >{{ item.badge }}</RamBadge
          >
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ram-sidenav {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: 12px;
  border: 1px solid var(--ram-glass-border);
  border-radius: var(--ram-radius-lg);
  box-shadow: var(--ram-shadow);
}

@media (min-width: 768px) {
  .ram-sidenav {
    padding: 14px;
  }
}

.ram-sidenav__backdrop {
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  background: var(--ram-glass);
  backdrop-filter: blur(24px) saturate(1.6);
  -webkit-backdrop-filter: blur(24px) saturate(1.6);
}

.ram-sidenav__inner {
  position: relative;
  z-index: 1;
}

.ram-sidenav__section {
  margin-bottom: 18px;
}
.ram-sidenav__section--last {
  margin-bottom: 0;
}

.ram-sidenav__title {
  font-family: var(--ram-font-mono);
  font-size: 10px;
  font-weight: 600;
  color: var(--ram-subtle);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 10px 8px;
}

.ram-sidenav__item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 10px;
  border: none;
  background: transparent;
  color: var(--ram-muted);
  font-family: var(--ram-font-body);
  font-weight: 500;
  font-size: 13px;
  border-radius: var(--ram-radius-sm);
  cursor: pointer;
  text-align: left;
  transition: all var(--ram-motion-fast);
}

.ram-sidenav__item:hover {
  color: var(--ram-text);
}

.ram-sidenav__item--active {
  background: linear-gradient(90deg, var(--ram-primary-soft), transparent);
  color: var(--ram-text);
  font-weight: 600;
}

.ram-sidenav__bar {
  position: absolute;
  left: 0;
  top: 8px;
  bottom: 8px;
  width: 3px;
  background: var(--ram-primary);
  border-radius: 3px;
  box-shadow: 0 0 8px color-mix(in oklch, var(--ram-primary) 53%, transparent);
}

.ram-sidenav__icon {
  font-size: 14px;
  color: var(--ram-subtle);
}

.ram-sidenav__item--active .ram-sidenav__icon {
  color: var(--ram-primary);
}

.ram-sidenav__label {
  flex: 1;
}

.ram-sidenav__badge {
  font-size: 10px;
  padding: 2px 8px;
}
</style>
