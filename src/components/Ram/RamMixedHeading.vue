<script setup lang="ts">
import { computed } from "vue";
import RamType from "./RamType.vue";

type Size = "XL" | "L" | "M" | "S";

const props = withDefaults(
  defineProps<{
    eyebrow?: string;
    title: string;
    subtitle?: string;
    size?: Size;
    as?: string;
  }>(),
  {
    eyebrow: undefined,
    title: "",
    subtitle: undefined,
    size: "L",
    as: "h2",
  },
);

const titleVariant = computed(
  () =>
    (
      ({
        XL: "displayXL",
        L: "displayL",
        M: "displayM",
        S: "headingL",
      }) as const
    )[props.size],
);

const headingTag = computed(() => props.as);
</script>

<template>
  <div class="ram-mixed-heading">
    <RamType v-if="eyebrow" variant="label" :color="'var(--ram-primary)'">
      {{ eyebrow }}
    </RamType>
    <RamType :variant="titleVariant" :as="headingTag" class="ram-mixed-heading__title">
      {{ title }}
    </RamType>
    <RamType
      v-if="subtitle"
      variant="bodyM"
      :color="'var(--ram-muted)'"
      class="ram-mixed-heading__subtitle"
    >
      {{ subtitle }}
    </RamType>
  </div>
</template>

<style scoped>
.ram-mixed-heading {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ram-mixed-heading__title {
  text-wrap: balance;
  word-break: normal;
  overflow-wrap: anywhere;
  line-break: strict;
}

.ram-mixed-heading__subtitle {
  margin-top: 4px;
}
</style>
