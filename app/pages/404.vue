<template>
  <div
    class="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
  >
    <div class="fixed inset-0 -z-20 bg-[var(--bg-primary)]" />

    <div class="relative z-10 text-center max-w-2xl mx-auto">
      <div class="flex justify-center">
        <img
          src="assets/images/icon/ic-404.svg"
          alt="404 Illustration"
          class="w-64 sm:w-80 md:w-96 h-auto select-none pointer-events-none"
          draggable="false"
          loading="lazy"
        />
      </div>

      <!-- Teks -->
      <div class="mt-6">
        <h1 class="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
          Oops! Lost in the code?
        </h1>
        <p
          class="text-[var(--text-muted)] mt-2 text-sm sm:text-base max-w-md mx-auto"
        >
          The page you're looking for doesn't exist. Maybe it's been moved or
          never existed at all.
        </p>
      </div>

      <!-- Tombol Navigasi -->
      <div class="flex flex-wrap justify-center gap-3 mt-8">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-purple-200 text-purple-900 font-semibold hover:bg-purple-300 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Go Home
        </NuxtLink>

        <NuxtLink
          to="/projects"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border-color)] hover:bg-[var(--bg-secondary)] transition-all duration-300 hover:scale-105 active:scale-95 text-[var(--text-secondary)]"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          View Projects
        </NuxtLink>
      </div>

      <!-- Fun Fact -->
      <div class="mt-8 text-xs text-[var(--text-muted)] opacity-60 font-mono">
        <span class="text-purple-400">$</span> echo "404 is just a number"<br />
        <span class="text-green-400">→</span> "404 is just a number"<br />
        <span class="text-purple-400">$</span>
        <span class="animate-pulse">_</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});
</script>

<style scoped>
.animate-pulse {
  animation: pulse 1s step-end infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

/* Efek hover pada SVG */
img[src*="404"] {
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

img[src*="404"]:hover {
  transform: scale(1.05) rotate(-2deg);
}
</style>
