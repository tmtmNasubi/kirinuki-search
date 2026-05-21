<script setup lang="ts">
import { computed, type CSSProperties } from "vue";

type Variant =
  | "displayXL"
  | "displayL"
  | "displayM"
  | "headingL"
  | "headingM"
  | "headingS"
  | "bodyL"
  | "bodyM"
  | "bodyS"
  | "uiM"
  | "uiS"
  | "label"
  | "mono";

const props = withDefaults(
  defineProps<{
    variant?: Variant;
    as?: string;
    color?: string;
  }>(),
  {
    variant: "bodyM",
    as: "span",
    color: undefined,
  },
);

const rootStyle = computed<CSSProperties>(() => ({
  color: props.color,
}));
</script>

<template>
  <component :is="as" :class="['ram-type', `ram-type--${variant}`]" :style="rootStyle">
    <slot />
  </component>
</template>

<style scoped>
.ram-type {
  margin: 0;
  font-family: var(--ram-font-body);
  letter-spacing: 0;
  overflow-wrap: anywhere;
}

.ram-type--displayXL,
.ram-type--displayL,
.ram-type--displayM,
.ram-type--headingL,
.ram-type--headingM,
.ram-type--headingS,
.ram-type--label {
  font-family: var(--ram-font-display);
}

.ram-type--mono {
  font-family: var(--ram-font-mono);
}

.ram-type--displayXL {
  font-size: 40px;
  font-weight: 700;
  line-height: 1.45;
  letter-spacing: -0.01em;
}
.ram-type--displayL {
  font-size: 34px;
  font-weight: 700;
  line-height: 1.45;
  letter-spacing: -0.01em;
}
.ram-type--displayM {
  font-size: 34px;
  font-weight: 700;
  line-height: 1.5;
}
.ram-type--headingL {
  font-size: 26px;
  font-weight: 700;
  line-height: 1.55;
}
.ram-type--headingM {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.6;
}
.ram-type--headingS {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.6;
}
.ram-type--bodyL {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.85;
}
.ram-type--bodyM {
  font-size: 15px;
  font-weight: 400;
  line-height: 1.8;
}
.ram-type--bodyS {
  font-size: 13px;
  font-weight: 400;
  line-height: 1.7;
}
.ram-type--uiM {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
}
.ram-type--uiS {
  font-size: 12px;
  font-weight: 400;
  line-height: 1.55;
}
.ram-type--label {
  font-size: 11px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}
.ram-type--mono {
  font-size: 12px;
  font-weight: 500;
  line-height: 1.55;
}

@media (min-width: 768px) {
  .ram-type--displayXL {
    font-size: 56px;
  }
  .ram-type--displayL {
    font-size: 44px;
  }
  .ram-type--bodyL {
    font-size: 17px;
    line-height: 1.9;
  }
}
</style>
