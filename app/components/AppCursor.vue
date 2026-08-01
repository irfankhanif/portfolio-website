<template>
  <div>
    <!-- Cursor -->
    <div
      ref="cursorEl"
      class="fixed pointer-events-none z-[999] w-3 h-3 rounded-full top-0 left-0 transition-colors duration-300"
      :class="theme === 'dark' ? 'bg-purple-400' : 'bg-purple-600'"
    />

    <!-- Ring -->
    <div
      ref="ringEl"
      class="fixed pointer-events-none z-[999] w-8 h-8 rounded-full border top-0 left-0 transition-colors duration-300"
      :class="
        theme === 'dark' ? 'border-purple-500/50' : 'border-purple-700/50'
      "
    />

    <!-- Glow -->
    <div
      ref="glowEl"
      class="fixed pointer-events-none z-[998] w-72 h-72 rounded-full blur-3xl opacity-[0.05] top-0 left-0 transition-colors duration-300"
      :class="theme === 'dark' ? 'bg-purple-400' : 'bg-purple-600'"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useTheme } from "~/composables/useTheme";

const { theme } = useTheme();

const cursorEl = ref<HTMLElement | null>(null);
const ringEl = ref<HTMLElement | null>(null);
const glowEl = ref<HTMLElement | null>(null);

let rafId = 0;

let targetX = -100;
let targetY = -100;

let ringCurX = -100;
let ringCurY = -100;

const onMouseMove = (e: MouseEvent) => {
  targetX = e.clientX;
  targetY = e.clientY;
};

const animate = () => {
  ringCurX += (targetX - ringCurX) * 0.12;
  ringCurY += (targetY - ringCurY) * 0.12;

  cursorEl.value?.style.setProperty(
    "transform",
    `translate(${targetX - 6}px, ${targetY - 6}px)`,
  );

  ringEl.value?.style.setProperty(
    "transform",
    `translate(${ringCurX - 16}px, ${ringCurY - 16}px)`,
  );

  glowEl.value?.style.setProperty(
    "transform",
    `translate(${targetX - 144}px, ${targetY - 144}px)`,
  );

  rafId = requestAnimationFrame(animate);
};

onMounted(() => {
  window.addEventListener("mousemove", onMouseMove);
  animate();
});

onUnmounted(() => {
  window.removeEventListener("mousemove", onMouseMove);
  cancelAnimationFrame(rafId);
});
</script>

<style scoped>
:global(*) {
  cursor: none;
}
</style>
