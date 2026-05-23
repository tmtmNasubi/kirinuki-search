<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme?: "auto" | "light" | "dark";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId?: string) => void;
    };
    onTurnstileLoaded?: () => void;
  }
}

const TURNSTILE_SCRIPT_ID = "cf-turnstile-api";
const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

const props = defineProps<{
  sitekey?: string;
}>();

const emit = defineEmits<{
  verified: [token: string];
  expired: [];
  failed: [];
}>();

const root = ref<HTMLElement>();
const widgetId = ref<string>();
const isLoaded = ref(Boolean(window.turnstile));
const isConfigured = computed(() => Boolean(props.sitekey));

const loadTurnstile = () => {
  if (window.turnstile) {
    isLoaded.value = true;
    return;
  }

  window.onTurnstileLoaded = () => {
    isLoaded.value = true;
  };

  if (document.getElementById(TURNSTILE_SCRIPT_ID)) return;

  const script = document.createElement("script");
  script.id = TURNSTILE_SCRIPT_ID;
  script.src = `${TURNSTILE_SCRIPT_SRC}&onload=onTurnstileLoaded`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
};

const renderWidget = async () => {
  if (!root.value || !props.sitekey || !window.turnstile || widgetId.value) return;

  await nextTick();
  widgetId.value = window.turnstile.render(root.value, {
    sitekey: props.sitekey,
    theme: "auto",
    callback: (token) => emit("verified", token),
    "expired-callback": () => emit("expired"),
    "error-callback": () => emit("failed"),
  });
};

watch(isLoaded, () => void renderWidget());
watch(() => props.sitekey, () => void renderWidget());

onMounted(() => {
  loadTurnstile();
  void renderWidget();
});

onBeforeUnmount(() => {
  if (widgetId.value) {
    window.turnstile?.remove(widgetId.value);
  }
});

defineExpose({
  reset: () => {
    emit("expired");
    window.turnstile?.reset(widgetId.value);
  },
});
</script>

<template>
  <div v-if="isConfigured" ref="root" class="turnstile-widget" />
</template>

<style scoped>
.turnstile-widget {
  min-height: 65px;
}
</style>
