<template>
  <div
    class="min-h-screen flex flex-col relative bg-[var(--bg-primary)] text-[var(--text-secondary)]"
  >
    <!-- Background Layer -->
    <div class="fixed inset-0 -z-20 bg-[var(--bg-primary)]" />

    <!-- Matrix Rain -->
    <canvas
      ref="matrixCanvas"
      class="matrix-canvas fixed inset-0 -z-10 pointer-events-none transition-opacity duration-700"
      :class="[
        theme === 'dark' ? 'opacity-100' : 'opacity-30',
        matrixReady ? 'opacity-25' : 'opacity-0',
      ]"
    />

    <!-- Navbar -->
    <AppNavbar />

    <!-- Main Content -->
    <main class="relative z-10 flex-1 pt-24">
      <slot />
    </main>

    <!-- Footer -->
    <AppFooter class="relative z-20" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTheme } from "~/composables/useTheme";

const { theme } = useTheme();

const matrixReady = ref(false);
const matrixCanvas = ref<HTMLCanvasElement | null>(null);

const { start } = useMatrixRain(matrixCanvas);

onMounted(() => {
  setTimeout(() => {
    start();
    matrixReady.value = true;
  }, 100);
});
</script>

<style scoped>
.matrix-canvas {
  pointer-events: none;
}
</style>
