<template>
  <footer
    class="border-t border-[var(--border-color)] bg-[var(--bg-primary)]/90 backdrop-blur-sm transition-colors duration-300"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8 lg:py-10">
      <!--  MAIN GRID — Desktop / Tablet-->
      <div
        class="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-4 sm:mt-0"
      >
        <!-- Navigate (hanya desktop) -->
        <div class="hidden lg:block text-center sm:text-left">
          <h4
            class="text-xs sm:text-sm font-semibold text-[var(--text-primary)] mb-2"
          >
            Navigate
          </h4>
          <ul class="space-y-1.5 text-xs sm:text-sm">
            <li v-for="link in navLinks" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Tech Stack (tablet & desktop) -->
        <div class="text-center sm:text-left">
          <h4
            class="text-xs sm:text-sm font-semibold text-[var(--text-primary)] mb-2"
          >
            Tech Stack
          </h4>
          <div class="flex flex-wrap justify-center sm:justify-start gap-1">
            <span
              v-for="tech in techStack"
              :key="tech"
              class="px-2 py-0.5 text-[9px] sm:text-[10px] rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-muted)] whitespace-nowrap"
            >
              {{ tech }}
            </span>
          </div>
        </div>

        <!-- Connect (tablet & desktop) -->
        <div class="text-center sm:text-left sm:col-span-2 lg:col-span-1">
          <h4
            class="text-xs sm:text-sm font-semibold text-[var(--text-primary)] mb-2"
          >
            Connect
          </h4>
          <div class="flex flex-wrap justify-center sm:justify-start gap-1.5">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="p-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-purple-500/50 transition-all"
              :aria-label="social.name"
              v-html="social.icon"
            ></a>
          </div>
          <button
            @click="toggleTheme"
            class="mt-2 w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-purple-500/50 transition-all"
          >
            <span>{{ theme === "dark" ? "☀️" : "🌙" }}</span>
            <span class="text-[10px]">{{
              theme === "dark" ? "Light" : "Dark"
            }}</span>
          </button>
        </div>
      </div>

      <!-- Mobile Version -->
      <div class="flex flex-col items-center gap-3 mt-4 sm:hidden">
        <!-- Social Icons -->
        <div class="flex gap-2">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="p-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-purple-500/50 transition-all"
            :aria-label="social.name"
            v-html="social.iconMobile || social.icon"
          ></a>
        </div>

        <!-- Theme Toggle -->
        <button
          @click="toggleTheme"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-purple-500/50 transition-all"
        >
          <span>{{ theme === "dark" ? "☀️" : "🌙" }}</span>
          <span class="text-[10px]">{{
            theme === "dark" ? "Light Mode" : "Dark Mode"
          }}</span>
        </button>
      </div>

      <!-- ==========================================================
           BOTTOM BAR — Ringkas di semua ukuran
      ========================================================== -->
      <div
        class="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-2 text-[9px] sm:text-[10px] lg:text-xs text-[var(--text-muted)]"
      >
        <p class="text-center">
          © {{ new Date().getFullYear() }} Irfan Khanif
          <span class="hidden xs:inline">· Built with</span>
          <span class="text-purple-400">Nuxt</span> &amp;
          <span class="text-purple-400">Tailwind</span>
        </p>

        <div class="flex items-center gap-2 sm:gap-3">
          <span class="font-mono tracking-wide">v1.0.0</span>
          <span class="w-px h-3 bg-[var(--border-color)]"></span>
          <button
            @click="scrollToTop"
            class="flex items-center gap-0.5 hover:text-[var(--text-primary)] transition-colors"
          >
            <svg
              class="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            <span class="text-[9px] sm:text-[10px]">Top</span>
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useTheme } from "~/composables/useTheme";
const { theme, toggleTheme } = useTheme();

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
];

const techStack = ["Vue.js", "Nuxt", "Tailwind", "TypeScript", "Laravel"];

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/yourusername",
    icon: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`,
    iconMobile: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/yourusername",
    icon: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/yourusername",
    icon: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  },
  {
    name: "Email",
    url: "mailto:your@email.com",
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`,
  },
];

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>
