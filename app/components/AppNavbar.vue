<template>
  <header
    ref="headerRef"
    class="fixed top-0 w-full z-50 transition-all duration-300"
    :class="[
      isScrolled
        ? 'bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-color)] shadow-lg'
        : 'bg-transparent border-b border-transparent',
    ]"
  >
    <div
      class="max-w-6xl mx-auto px-6 transition-all duration-300"
      :class="isScrolled ? 'py-4' : 'py-6'"
    >
      <nav class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 hover:scale-105 transition-transform duration-300"
        >
          irfankhnf.
        </NuxtLink>

        <!-- Desktop Links -->
        <div class="hidden md:flex items-center gap-8 text-sm font-medium">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="relative group py-1 transition-colors duration-300"
            :class="
              route.path === link.to
                ? 'text-[var(--text-primary)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            "
          >
            {{ link.label }}
            <span
              class="absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-300"
              :class="
                route.path === link.to
                  ? 'w-full opacity-100'
                  : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
              "
            ></span>
            <span
              class="absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-purple-400 blur-sm transition-all duration-300"
              :class="
                route.path === link.to
                  ? 'w-full opacity-60'
                  : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-60'
              "
            ></span>
            <span
              v-if="route.path === link.to"
              class="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple-400"
            ></span>
          </NuxtLink>
        </div>

        <!-- Desktop Right -->
        <div class="hidden md:flex items-center gap-4">
          <!-- Social Icons -->
          <div class="flex items-center gap-2 mr-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1"
              aria-label="GitHub"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1"
              aria-label="LinkedIn"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1"
              aria-label="Twitter"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                />
              </svg>
            </a>
          </div>

          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1 text-lg"
            aria-label="Toggle theme"
          >
            {{ theme === "dark" ? "☀️" : "🌙" }}
          </button>

          <!-- Resume Button -->
          <button
            class="bg-purple-200 text-purple-900 px-5 py-2 rounded-lg text-sm font-bold hover:bg-purple-300 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Resume
          </button>
        </div>

        <!-- Mobile Button (Hamburger) -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 group"
          aria-label="Toggle menu"
          :aria-expanded="mobileMenu"
        >
          <span
            class="block w-6 h-0.5 bg-current transition-all duration-300"
            :class="[
              mobileMenu ? 'rotate-45 translate-y-2' : 'rotate-0 translate-y-0',
            ]"
          ></span>
          <span
            class="block w-6 h-0.5 bg-current transition-all duration-300"
            :class="[mobileMenu ? 'opacity-0 -translate-x-2' : 'opacity-100']"
          ></span>
          <span
            class="block w-6 h-0.5 bg-current transition-all duration-300"
            :class="[
              mobileMenu
                ? '-rotate-45 -translate-y-2'
                : 'rotate-0 translate-y-0',
            ]"
          ></span>
        </button>
      </nav>
    </div>

    <!-- Scroll Progress Bar -->
    <div
      class="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-150"
      :style="{ width: `${scrollProgress}%` }"
    ></div>

    <!-- Mobile Drawer -->
    <Transition name="drawer">
      <aside
        v-if="mobileMenu"
        class="fixed top-0 right-0 z-50 flex h-full w-[85%] max-w-sm flex-col bg-[var(--bg-secondary)] border-l border-[var(--border-color)] p-6 shadow-2xl"
        role="dialog"
        aria-label="Mobile navigation"
      >
        <div
          class="mb-8 flex items-center justify-between border-b border-[var(--border-color)] pb-6"
        >
          <NuxtLink
            to="/"
            @click="mobileMenu = false"
            class="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600"
          >
            irfankhnf.
          </NuxtLink>
          <button
            @click="mobileMenu = false"
            class="rounded-md p-2 text-[var(--text-muted)] transition hover:bg-white/5 hover:text-[var(--text-primary)]"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav class="flex flex-col gap-2">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            @click="mobileMenu = false"
            class="group flex items-center justify-between rounded-lg px-4 py-3 text-lg text-[var(--text-secondary)] transition hover:bg-white/5 hover:text-[var(--text-primary)]"
            active-class="bg-purple-500/10 text-[var(--text-primary)] border border-purple-500/20"
          >
            <span>{{ link.label }}</span>
            <span
              class="translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
            >
              →
            </span>
          </NuxtLink>
        </nav>

        <div class="mt-auto">
          <div class="border-t border-[var(--border-color)] pt-6 space-y-3">
            <button
              @click="toggleTheme"
              class="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-[var(--text-secondary)] transition hover:bg-white/5 hover:text-[var(--text-primary)]"
            >
              <span>{{ theme === "dark" ? "☀️" : "🌙" }}</span>
              <span>Switch Theme</span>
            </button>
            <div class="flex gap-4 px-4 py-2">
              <a
                href="https://github.com"
                target="_blank"
                class="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition"
                >GitHub</a
              >
              <a
                href="https://linkedin.com"
                target="_blank"
                class="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition"
                >LinkedIn</a
              >
              <a
                href="https://twitter.com"
                target="_blank"
                class="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition"
                >Twitter</a
              >
            </div>
            <button
              class="w-full rounded-lg bg-purple-200 py-3 font-semibold text-purple-900 transition hover:bg-purple-300"
            >
              ⬇ Resume
            </button>
          </div>
          <div
            class="mt-8 border-t border-[var(--border-color)] pt-5 text-center text-xs text-[var(--text-muted)]"
          >
            © 2026 Irfan Khanif
          </div>
        </div>
      </aside>
    </Transition>

    <!-- Overlay -->
    <Transition name="fade">
      <div
        v-if="mobileMenu"
        @click="mobileMenu = false"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      />
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useTheme } from "~/composables/useTheme";

const { theme, toggleTheme } = useTheme();
// State
const route = useRoute();
const mobileMenu = ref(false);
const isScrolled = ref(false);
const scrollProgress = ref(0);
const headerRef = ref<HTMLElement | null>(null);

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
];

const toggleMobileMenu = () => {
  mobileMenu.value = !mobileMenu.value;
};

const handleScroll = () => {
  if (import.meta.client) {
    const scrollY = window.scrollY;
    isScrolled.value = scrollY > 20;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    scrollProgress.value = Math.min(progress, 100);
  }
};

// Lifecycle
onMounted(() => {
  if (import.meta.client) {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    window.addEventListener("keydown", onKeydown);
  }
});

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("keydown", onKeydown);
    document.body.style.overflow = ""; // reset
  }
});

// Watchers (dengan guard)
watch(mobileMenu, (isOpen) => {
  if (import.meta.client) {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }
});

watch(
  () => route.fullPath,
  () => {
    mobileMenu.value = false;
  },
);

// Keyboard handler
const onKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    mobileMenu.value = false;
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
}
button.md\\:hidden span {
  background-color: var(--text-secondary);
}
</style>
