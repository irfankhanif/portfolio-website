<template>
  <button
    class="glass-toggle"
    :class="theme"
    @click="toggleTheme"
    :aria-pressed="theme === 'light'"
    aria-label="Toggle theme"
  >
    <div class="glass-track" />
    <div class="glass-knob">
      <IconMoon class="icon-moon" aria-hidden="true" />
      <IconSun class="icon-sun" aria-hidden="true" />
    </div>
  </button>
</template>

<script setup lang="ts">
import { useTheme } from "~/composables/useTheme";
const { theme, toggleTheme } = useTheme();
import { IconMoon, IconSun } from "@tabler/icons-vue";
</script>

<style scoped>
.glass-toggle {
  position: relative;
  width: 56px;
  height: 28px;
  border-radius: 999px;
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 0;
  flex-shrink: 0;
}
.glass-track {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  backdrop-filter: blur(12px) saturate(1.8);
  -webkit-backdrop-filter: blur(12px) saturate(1.8);
  transition:
    background 0.5s ease,
    border-color 0.5s ease;
}
.dark .glass-track {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.15),
    0 4px 16px rgba(0, 0, 0, 0.3);
}
.light .glass-track {
  background: rgba(255, 255, 255, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.7),
    0 4px 16px rgba(0, 0, 0, 0.12);
}
.glass-knob {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  transition:
    transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
    background 0.5s ease;
}
.dark .glass-knob {
  transform: translateX(0);
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.25),
    0 2px 8px rgba(0, 0, 0, 0.4);
}
.light .glass-knob {
  transform: translateX(28px);
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 1),
    0 2px 8px rgba(0, 0, 0, 0.15);
}
.icon-moon,
.icon-sun {
  position: absolute;
  transition: opacity 0.3s ease;
}
.dark .icon-moon {
  opacity: 1;
  color: #c8d8f8;
}
.dark .icon-sun {
  opacity: 0;
}
.light .icon-moon {
  opacity: 0;
}
.light .icon-sun {
  opacity: 1;
  color: #f59e0b;
}
</style>
