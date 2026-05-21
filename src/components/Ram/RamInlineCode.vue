<template>
  <code class="ram-inline-code">
    <slot />
  </code>
</template>

<style scoped>
.ram-inline-code {
  font-family: var(--ram-font-mono);
  font-size: 0.92em;
  background: var(--ram-code-bg);
  border: 1px solid var(--ram-border);
  border-radius: 5px;
  padding: 1px 6px;
  color: var(--ram-accent);
  overflow-wrap: anywhere;
  word-break: normal;
}
</style>
