<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

interface LinkItem {
  value: string;
  label: string;
  to?: string;
  href?: string;
  external?: boolean;
}

const props = defineProps<{
  brand: string;
  links: Array<string | LinkItem>;
  active?: string;
}>();

const emit = defineEmits<{ nav: [string] }>();

const normalize = (l: string | LinkItem): LinkItem =>
  typeof l === "string" ? { value: l, label: l } : l;

const isActive = (l: string | LinkItem) => normalize(l).value === props.active;

const isOpen = ref(false);

const closeMenu = () => {
  isOpen.value = false;
};

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const onClick = (l: LinkItem) => {
  emit("nav", l.value);
  closeMenu();
};

let desktopNavMediaQuery: MediaQueryList | undefined;

watch(isOpen, (open, _, onCleanup) => {
  if (!open) return;

  const originalOverflow = document.body.style.overflow;
  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") closeMenu();
  };

  document.body.style.overflow = "hidden";
  document.addEventListener("keydown", onKeydown);

  onCleanup(() => {
    document.removeEventListener("keydown", onKeydown);
    document.body.style.overflow = originalOverflow;
  });
});

const closeMenuOnDesktop = () => {
  if (desktopNavMediaQuery?.matches) closeMenu();
};

onMounted(() => {
  const desktopNavBreakpoint =
    getComputedStyle(document.documentElement).getPropertyValue("--ram-bp-md").trim() || "768px";

  desktopNavMediaQuery = window.matchMedia(`(min-width: ${desktopNavBreakpoint})`);
  closeMenuOnDesktop();
  desktopNavMediaQuery.addEventListener("change", closeMenuOnDesktop);
});

onBeforeUnmount(() => {
  desktopNavMediaQuery?.removeEventListener("change", closeMenuOnDesktop);
});
</script>

<template>
  <div class="ram-topnav">
    <div class="ram-topnav__backdrop" aria-hidden="true" />
    <div class="ram-topnav__left">
      <div class="ram-topnav__brand">{{ brand }}</div>
      <nav class="ram-topnav__links" aria-label="Primary">
        <template v-for="raw in links" :key="normalize(raw).value">
          <NuxtLink
            v-if="normalize(raw).to"
            :to="normalize(raw).to!"
            :class="['ram-topnav__link', { 'ram-topnav__link--active': isActive(raw) }]"
            :aria-current="isActive(raw) ? 'page' : undefined"
            @click="onClick(normalize(raw))"
          >
            {{ normalize(raw).label }}
          </NuxtLink>
          <a
            v-else-if="normalize(raw).href"
            :href="normalize(raw).href"
            :class="['ram-topnav__link', { 'ram-topnav__link--active': isActive(raw) }]"
            :aria-current="isActive(raw) ? 'page' : undefined"
            :target="normalize(raw).external ? '_blank' : undefined"
            :rel="normalize(raw).external ? 'noopener noreferrer' : undefined"
            @click="onClick(normalize(raw))"
          >
            {{ normalize(raw).label }}
          </a>
          <button
            v-else
            type="button"
            :class="['ram-topnav__link', { 'ram-topnav__link--active': isActive(raw) }]"
            :aria-current="isActive(raw) ? 'page' : undefined"
            @click="onClick(normalize(raw))"
          >
            {{ normalize(raw).label }}
          </button>
        </template>
      </nav>
    </div>
    <div class="ram-topnav__right">
      <slot />
      <button
        type="button"
        class="ram-topnav__toggle"
        :aria-expanded="isOpen"
        aria-controls="ram-topnav-drawer"
        :aria-label="isOpen ? 'メニューを閉じる' : 'メニューを開く'"
        @click="toggleMenu"
      >
        <span :class="['ram-topnav__bar', { 'ram-topnav__bar--open': isOpen }]" />
        <span :class="['ram-topnav__bar', { 'ram-topnav__bar--open': isOpen }]" />
        <span :class="['ram-topnav__bar', { 'ram-topnav__bar--open': isOpen }]" />
      </button>
    </div>

    <ClientOnly>
      <Teleport to="body">
        <Transition name="ram-topnav-drawer">
          <div v-if="isOpen" class="ram-topnav__overlay-wrap">
            <div class="ram-topnav__overlay" aria-hidden="true" @click="closeMenu" />
            <div
              id="ram-topnav-drawer"
              class="ram-topnav__drawer"
              role="dialog"
              aria-modal="true"
              aria-label="ナビゲーション"
            >
              <nav class="ram-topnav__drawer-links" aria-label="Primary mobile">
                <template v-for="raw in links" :key="normalize(raw).value">
                  <NuxtLink
                    v-if="normalize(raw).to"
                    :to="normalize(raw).to!"
                    :class="[
                      'ram-topnav__drawer-link',
                      {
                        'ram-topnav__drawer-link--active': isActive(raw),
                      },
                    ]"
                    :aria-current="isActive(raw) ? 'page' : undefined"
                    @click="onClick(normalize(raw))"
                  >
                    {{ normalize(raw).label }}
                  </NuxtLink>
                  <a
                    v-else-if="normalize(raw).href"
                    :href="normalize(raw).href"
                    :class="[
                      'ram-topnav__drawer-link',
                      {
                        'ram-topnav__drawer-link--active': isActive(raw),
                      },
                    ]"
                    :aria-current="isActive(raw) ? 'page' : undefined"
                    :target="normalize(raw).external ? '_blank' : undefined"
                    :rel="normalize(raw).external ? 'noopener noreferrer' : undefined"
                    @click="onClick(normalize(raw))"
                  >
                    {{ normalize(raw).label }}
                  </a>
                  <button
                    v-else
                    type="button"
                    :class="[
                      'ram-topnav__drawer-link',
                      {
                        'ram-topnav__drawer-link--active': isActive(raw),
                      },
                    ]"
                    :aria-current="isActive(raw) ? 'page' : undefined"
                    @click="onClick(normalize(raw))"
                  >
                    {{ normalize(raw).label }}
                  </button>
                </template>
              </nav>
            </div>
          </div>
        </Transition>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<style scoped>
.ram-topnav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: auto;
  gap: 8px;
  padding: 8px 14px;
  border: 1px solid var(--ram-glass-border);
  border-radius: var(--ram-radius-lg);
  box-shadow: var(--ram-shadow);
  position: relative;
  isolation: isolate;
}

.ram-topnav__backdrop {
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  background: var(--ram-glass);
  backdrop-filter: blur(24px) saturate(1.6);
  -webkit-backdrop-filter: blur(24px) saturate(1.6);
}

.ram-topnav__left,
.ram-topnav__right {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
}

.ram-topnav__left {
  gap: 16px;
  flex: 1 1 auto;
  overflow: hidden;
}

.ram-topnav__right {
  gap: 8px;
  flex: 0 0 auto;
}

.ram-topnav__brand {
  font-family: var(--ram-font-display);
  font-weight: 700;
  font-size: 16px;
  background: linear-gradient(90deg, var(--ram-primary), var(--ram-sun));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ram-topnav__links {
  display: none;
  gap: 2px;
}

.ram-topnav__link {
  padding: 7px 14px;
  border: none;
  background: transparent;
  color: var(--ram-muted);
  font-family: var(--ram-font-display);
  font-weight: 600;
  font-size: 13px;
  border-radius: var(--ram-radius-pill);
  cursor: pointer;
  transition: all var(--ram-motion-fast);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.ram-topnav__link:hover {
  color: var(--ram-text);
}

.ram-topnav__link--active {
  background: var(--ram-glass-strong);
  color: var(--ram-text);
}

.ram-topnav__toggle {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  gap: 5px;
  padding: 0;
  border: 1px solid var(--ram-glass-border);
  background: var(--ram-glass);
  border-radius: var(--ram-radius-md);
  cursor: pointer;
  transition: background var(--ram-motion-fast);
}

.ram-topnav__toggle:hover {
  background: var(--ram-glass-strong);
}

.ram-topnav__bar {
  display: block;
  width: 18px;
  height: 2px;
  background: var(--ram-text);
  border-radius: 2px;
  transition:
    transform var(--ram-motion-base),
    opacity var(--ram-motion-fast);
}

.ram-topnav__bar--open:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.ram-topnav__bar--open:nth-child(2) {
  opacity: 0;
}
.ram-topnav__bar--open:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (min-width: 768px) {
  .ram-topnav {
    padding: 10px 18px;
  }

  .ram-topnav__left {
    gap: 24px;
  }

  .ram-topnav__right {
    gap: 10px;
  }

  .ram-topnav__brand {
    font-size: 18px;
  }

  .ram-topnav__links {
    display: flex;
  }

  .ram-topnav__toggle {
    display: none;
  }
}
</style>

<style>
.ram-topnav__overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(10, 10, 22, 0.45);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.ram-topnav__drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 51;
  width: min(82vw, 320px);
  padding: var(--ram-space-7) var(--ram-space-5) var(--ram-space-5);
  background: var(--ram-bg-soft);
  border-left: 1px solid var(--ram-border);
  box-shadow: -16px 0 48px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  gap: var(--ram-space-3);
  overflow-y: auto;
}

.ram-topnav__drawer-links {
  display: flex;
  flex-direction: column;
  gap: var(--ram-space-1);
  margin-top: var(--ram-space-4);
}

.ram-topnav__drawer-link {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 44px;
  padding: 12px 16px;
  border: none;
  background: transparent;
  color: var(--ram-text);
  font-family: var(--ram-font-display);
  font-weight: 600;
  font-size: 16px;
  border-radius: var(--ram-radius-md);
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  transition: background var(--ram-motion-fast);
}

.ram-topnav__drawer-link:hover {
  background: var(--ram-glass-inner);
}

.ram-topnav__drawer-link--active {
  background: var(--ram-primary-soft);
  color: var(--ram-primary);
}

@media (min-width: 768px) {
  .ram-topnav__overlay,
  .ram-topnav__drawer {
    display: none;
  }
}

.ram-topnav-drawer-enter-active,
.ram-topnav-drawer-leave-active {
  transition: opacity var(--ram-motion-base);
}
.ram-topnav-drawer-enter-active .ram-topnav__drawer,
.ram-topnav-drawer-leave-active .ram-topnav__drawer {
  transition: transform var(--ram-motion-base);
}
.ram-topnav-drawer-enter-from,
.ram-topnav-drawer-leave-to {
  opacity: 0;
}
.ram-topnav-drawer-enter-from .ram-topnav__drawer,
.ram-topnav-drawer-leave-to .ram-topnav__drawer {
  transform: translateX(100%);
}
</style>
