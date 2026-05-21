<script setup lang="ts">
interface Crumb {
  label: string;
  to?: string;
}

defineProps<{
  items: Array<string | Crumb>;
}>();
</script>

<template>
  <nav class="ram-breadcrumbs" aria-label="Breadcrumb">
    <template v-for="(item, i) in items" :key="i">
      <span v-if="i > 0" class="ram-breadcrumbs__sep">/</span>
      <NuxtLink
        v-if="typeof item === 'object' && item.to"
        :to="item.to"
        :class="[
          'ram-breadcrumbs__item',
          { 'ram-breadcrumbs__item--current': i === items.length - 1 },
        ]"
        >{{ item.label }}</NuxtLink
      >
      <span
        v-else
        :class="[
          'ram-breadcrumbs__item',
          { 'ram-breadcrumbs__item--current': i === items.length - 1 },
        ]"
        >{{ typeof item === "string" ? item : item.label }}</span
      >
    </template>
  </nav>
</template>

<style scoped>
.ram-breadcrumbs {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--ram-font-body);
  font-size: 13px;
}

.ram-breadcrumbs__sep {
  color: var(--ram-subtle);
  font-family: var(--ram-font-mono);
}

.ram-breadcrumbs__item {
  color: var(--ram-muted);
  font-weight: 400;
  text-decoration: none;
  padding: 2px 6px;
  border-radius: var(--ram-radius-xs);
  transition: all var(--ram-motion-fast);
}

a.ram-breadcrumbs__item:hover {
  background: var(--ram-glass-inner);
  color: var(--ram-text);
}

.ram-breadcrumbs__item--current {
  color: var(--ram-text);
  font-weight: 500;
}
</style>
