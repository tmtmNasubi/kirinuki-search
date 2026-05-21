<script setup lang="ts">
import { computed, useId } from "vue";

type Size = "md" | "lg";
type InputMode = "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";
type Autocomplete = "off" | "on" | "email" | "name" | "username" | "url" | "one-time-code";

const model = defineModel<string>({ default: "" });

const props = withDefaults(
  defineProps<{
    id?: string;
    label: string;
    placeholder?: string;
    actionLabel?: string;
    type?: "text" | "email" | "search" | "url";
    inputmode?: InputMode;
    autocomplete?: Autocomplete;
    help?: string;
    error?: string;
    size?: Size;
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    showLabel?: boolean;
  }>(),
  {
    id: undefined,
    placeholder: "",
    actionLabel: "登録",
    type: "email",
    inputmode: "email",
    autocomplete: "email",
    help: undefined,
    error: undefined,
    size: "lg",
    disabled: false,
    loading: false,
    fullWidth: true,
    showLabel: false,
  },
);

const emit = defineEmits<{
  submit: [value: string];
}>();

const fallbackId = useId();
const inputId = computed(() => props.id ?? `ram-input-${fallbackId}`);
const helpId = computed(() => `${inputId.value}-help`);
const errorId = computed(() => `${inputId.value}-error`);
const descriptionIds = computed(() =>
  [props.help ? helpId.value : "", props.error ? errorId.value : ""].filter(Boolean).join(" "),
);
const isDisabled = computed(() => props.disabled || props.loading);

const handleSubmit = () => {
  if (isDisabled.value) return;
  emit("submit", model.value);
};
</script>

<template>
  <form
    :class="[
      'ram-input-form',
      `ram-input-form--${size}`,
      {
        'ram-input-form--full': fullWidth,
        'ram-input-form--invalid': error,
        'ram-input-form--disabled': isDisabled,
      },
    ]"
    @submit.prevent="handleSubmit"
  >
    <label
      :class="['ram-input-form__label', { 'ram-input-form__label--hidden': !showLabel }]"
      :for="inputId"
    >
      {{ label }}
    </label>

    <div class="ram-input-form__control">
      <input
        :id="inputId"
        v-model="model"
        class="ram-input-form__input"
        :type="type"
        :inputmode="inputmode"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :disabled="isDisabled"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="descriptionIds || undefined"
      />

      <button class="ram-input-form__button" type="submit" :disabled="isDisabled">
        <span>{{ loading ? "送信中" : actionLabel }}</span>
        <span class="ram-input-form__button-icon" aria-hidden="true">→</span>
      </button>
    </div>

    <p v-if="help" :id="helpId" class="ram-input-form__help">
      {{ help }}
    </p>
    <p v-if="error" :id="errorId" class="ram-input-form__error">
      {{ error }}
    </p>
  </form>
</template>

<style scoped>
.ram-input-form {
  display: grid;
  gap: var(--ram-space-2);
  width: fit-content;
  max-width: 100%;
  font-family: var(--ram-font-body);
}

.ram-input-form--full {
  width: 100%;
}

.ram-input-form__label {
  color: var(--ram-text);
  font-size: 14px;
  font-weight: 700;
  line-height: 1.65;
  letter-spacing: 0;
}

.ram-input-form__label--hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.ram-input-form__control {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  width: 100%;
  min-width: 280px;
  border: 1px solid var(--ram-glass-border);
  border-radius: var(--ram-radius-pill);
  background: color-mix(in oklch, var(--ram-glass-strong) 78%, #fff 22%);
  box-shadow:
    inset 0 1px 0 var(--ram-glass-highlight),
    var(--ram-shadow);
  backdrop-filter: blur(24px) saturate(1.45);
  -webkit-backdrop-filter: blur(24px) saturate(1.45);
  transition:
    border-color var(--ram-motion-base),
    box-shadow var(--ram-motion-base),
    transform var(--ram-motion-fast);
}

.ram-input-form__control:focus-within {
  border-color: color-mix(in oklch, var(--ram-sky) 48%, #fff);
  box-shadow:
    inset 0 1px 0 var(--ram-glass-highlight),
    var(--ram-shadow),
    0 0 0 4px color-mix(in oklch, var(--ram-sky) 18%, transparent);
}

.ram-input-form--invalid .ram-input-form__control {
  border-color: color-mix(in oklch, var(--ram-danger) 48%, #fff);
  box-shadow:
    inset 0 1px 0 var(--ram-glass-highlight),
    var(--ram-shadow),
    0 0 0 4px color-mix(in oklch, var(--ram-danger) 14%, transparent);
}

.ram-input-form__input {
  min-width: 0;
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--ram-text);
  font: inherit;
  font-weight: 600;
  letter-spacing: 0;
}

.ram-input-form__input::placeholder {
  color: var(--ram-muted);
  opacity: 0.76;
}

.ram-input-form__input:disabled {
  cursor: not-allowed;
}

.ram-input-form__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  border: 1px solid color-mix(in oklch, var(--ram-glass-highlight) 55%, transparent);
  border-radius: var(--ram-radius-pill);
  background: linear-gradient(135deg, var(--ram-primary), var(--ram-sun));
  color: #fff;
  box-shadow:
    0 6px 18px color-mix(in oklch, var(--ram-primary) 24%, transparent),
    inset 0 1px 0 rgba(255, 255, 255, 0.34);
  font-family: var(--ram-font-display);
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0;
  cursor: pointer;
  white-space: nowrap;
  transition:
    transform var(--ram-motion-fast),
    box-shadow var(--ram-motion-base),
    filter var(--ram-motion-fast);
}

.ram-input-form__button:hover:not(:disabled) {
  box-shadow:
    0 10px 28px color-mix(in oklch, var(--ram-primary) 38%, transparent),
    inset 0 1px 0 rgba(255, 255, 255, 0.42);
  transform: translateY(-1px);
}

.ram-input-form__button:active:not(:disabled) {
  transform: translateY(1px) scale(0.98);
}

.ram-input-form__button:disabled {
  cursor: not-allowed;
  filter: saturate(0.72);
  opacity: 0.64;
}

.ram-input-form__button-icon {
  line-height: 1;
}

.ram-input-form__help,
.ram-input-form__error {
  margin: 0;
  font-size: 13px;
  line-height: 1.65;
  letter-spacing: 0;
}

.ram-input-form__help {
  color: var(--ram-muted);
}

.ram-input-form__error {
  color: var(--ram-danger);
  font-weight: 700;
}

.ram-input-form--md .ram-input-form__control {
  min-height: 56px;
  padding: 5px;
}

.ram-input-form--md .ram-input-form__input {
  padding: 0 13px 0 18px;
  font-size: 15px;
}

.ram-input-form--md .ram-input-form__button {
  min-height: 44px;
  padding: 0 18px;
  gap: 8px;
  font-size: 15px;
}

.ram-input-form--lg .ram-input-form__control {
  min-height: 72px;
  padding: 8px;
}

.ram-input-form--lg .ram-input-form__input {
  padding: 0 16px 0 22px;
  font-size: clamp(16px, 1rem, 18px);
}

.ram-input-form--lg .ram-input-form__button {
  min-height: 56px;
  padding: 0 28px;
  gap: 10px;
  font-size: 18px;
}

.ram-input-form--disabled .ram-input-form__control {
  opacity: 0.72;
}

@media (max-width: 520px) {
  .ram-input-form__control {
    min-width: 0;
  }

  .ram-input-form--lg .ram-input-form__button {
    padding-inline: 20px;
    font-size: 16px;
  }

  .ram-input-form--lg .ram-input-form__input {
    padding-inline: 18px 10px;
  }
}
</style>
