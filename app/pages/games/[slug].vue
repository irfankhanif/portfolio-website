<template>
  <div
    class="min-h-screen bg-[var(--bg-primary)] text-[var(--text-secondary)] font-sans selection:bg-purple-500/30"
  >
    <!-- Game tidak ditemukan -->
    <div
      v-if="!currentGame"
      class="flex flex-col items-center justify-center min-h-screen gap-4"
    >
      <p class="text-[var(--text-muted)] font-mono text-sm">Game not found.</p>
      <button
        class="text-xs text-purple-400 hover:text-purple-300 transition"
        @click="handleBack"
      >
        ← Back to Projects
      </button>
    </div>

    <!-- Game ditemukan -->
    <Suspense v-else>
      <template #default>
        <div class="max-w-4xl mx-auto px-6 py-8 pt-24">
          <component :is="currentGame.component" @back="handleBack" />
        </div>
      </template>
      <template #fallback>
        <div class="flex items-center justify-center min-h-screen">
          <div class="text-[var(--text-muted)] text-sm font-mono animate-pulse">
            Loading game...
          </div>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, computed } from "vue";

// ============================================================
// Game Registry
// Tambah game baru cukup di sini — tidak perlu buat page baru
// ============================================================
const GAME_REGISTRY = {
  tictactoe: {
    title: "Tic Tac Toe Neon",
    description: "Play Tic Tac Toe against a friend or AI with minimax engine.",
    component: defineAsyncComponent(
      () => import("~/components/games/TicTacToe.vue"),
    ),
  },
  // Contoh game berikutnya:
  "neon-memory": {
    title: "Game Memory",
    description: "Classic memory game.",
    component: defineAsyncComponent(
      () => import("~/components/games/GameMemory.vue"),
    ),
  },
  "typing-speed": {
    title: "Typing Speed Test",
    description: "Test your typing speed and accuracy.",
    component: defineAsyncComponent(
      () => import("~/components/games/GameTyping.vue"),
    ),
  },
  // chess: {
  //   title: "Chess",
  //   description: "Play chess against an AI.",
  //   component: defineAsyncComponent(() => import("~/components/games/Chess.vue")),
  // },
} satisfies Record<
  string,
  {
    title: string;
    description: string;
    component: ReturnType<typeof defineAsyncComponent>;
  }
>;

type GameSlug = keyof typeof GAME_REGISTRY;

// ============================================================
// Route
// ============================================================
definePageMeta({
  layout: "default",
  pageTransition: { name: "fade", mode: "out-in" },
});

const route = useRoute();
const slug = computed(() => route.params.slug as string);
const currentGame = computed(() =>
  slug.value in GAME_REGISTRY ? GAME_REGISTRY[slug.value as GameSlug] : null,
);

// ============================================================
// SEO — dinamis per game
// ============================================================
useSeoMeta({
  title: computed(() => currentGame.value?.title ?? "Game Not Found"),
  description: computed(() => currentGame.value?.description ?? ""),
  ogTitle: computed(() => currentGame.value?.title ?? "Game Not Found"),
  ogDescription: computed(() => currentGame.value?.description ?? ""),
});

// ============================================================
// Navigation
// ============================================================
const handleBack = () => navigateTo("/projects");
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
