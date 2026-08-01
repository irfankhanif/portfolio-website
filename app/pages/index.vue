<template>
  <div>
    <div
      class="min-h-screen bg-[var(--bg-primary)] text-[var(--text-secondary)] font-sans selection:bg-purple-500/30"
    >
      <div class="max-w-6xl mx-auto px-6 py-8">
        <!-- ==========================================================
             HERO SECTION
        ========================================================== -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <!-- Left: Intro -->
          <div>
            <div
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)]/50 mb-6"
            >
              <span class="w-2 h-2 rounded-full bg-green-500"></span>
              <span class="text-xs text-[var(--text-secondary)] font-mono"
                >Available for new opportunities</span
              >
            </div>
            <h1
              class="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight"
            >
              Hi, I'm
              <span class="aurora-text"> Irfan Khanif </span>
            </h1>
            <h2
              class="text-xl text-[var(--text-secondary)] mb-6 leading-relaxed"
            >
              Frontend Developer specializing in high-performance digital
              experiences.
            </h2>
            <p
              class="text-[var(--text-muted)] mb-8 text-sm leading-relaxed max-w-md"
            >
              I build accessible, responsive, and aesthetically driven
              applications using modern web technologies. Focused on bridging
              the gap between sophisticated design and robust engineering.
            </p>
            <div class="flex items-center gap-4">
              <button
                class="bg-purple-200 text-purple-900 px-6 py-3 rounded text-sm font-bold hover:bg-purple-300 transition-colors"
              >
                View Projects
              </button>
              <button
                class="flex items-center gap-2 px-6 py-3 rounded border border-[var(--border-color)] hover:bg-[var(--bg-secondary)] transition-colors text-sm font-medium text-[var(--text-primary)]"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  ></path>
                </svg>
                Download CV
              </button>
            </div>
          </div>

          <!-- ==========================================================
               TERMINAL — DENGAN TYPING NATURAL
          ========================================================== -->
          <div
            class="rounded-xl border border-[var(--border-color)] bg-[#1e1e1e] shadow-2xl overflow-hidden"
          >
            <!-- Title Bar -->
            <div
              class="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-color)] bg-[#252526]"
            >
              <div class="w-3 h-3 rounded-full bg-red-500"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
              <div class="mx-auto text-xs text-gray-500 font-mono">
                bash - irfan@macbook-pro:~
              </div>
            </div>

            <!-- Terminal Body -->
            <div class="p-6 font-mono text-sm min-h-[220px]">
              <!-- Command -->
              <div class="text-green-400 mb-2">
                ➜ ~ <span>{{ typedCommand }}</span
                ><span v-if="!outputVisible" class="animate-pulse">_</span>
              </div>

              <!-- Output lines yang sudah selesai -->
              <div v-if="outputVisible">
                <div class="text-gray-300 mb-1">{</div>
                <div
                  v-for="(line, index) in visibleLines"
                  :key="index"
                  class="pl-4 mb-1"
                  v-html="line"
                ></div>

                <!-- Baris yang sedang di-typing -->
                <div v-if="isTypingLine" class="pl-4 mb-1">
                  {{ typingLine }}<span class="animate-pulse">_</span>
                </div>

                <div
                  v-if="
                    visibleLines.length >= termLines.length && !isTypingLine
                  "
                  class="text-gray-300 mb-4"
                >
                  }
                </div>
              </div>

              <!-- Prompt akhir -->
              <div v-if="done" class="text-green-400">
                ➜ ~ <span class="animate-pulse">_</span>
              </div>
            </div>
          </div>
        </div>

        <!-- ==========================================================
             STATS (REVEAL)
        ========================================================== -->
        <div
          ref="statsRef"
          class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24 transition-all duration-700 ease-out"
          :class="
            statsVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          "
        >
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] flex flex-col items-center justify-center text-center"
          >
            <div class="text-2xl font-bold text-[var(--text-primary)] mb-1">
              {{ stat.value }}
            </div>
            <div
              class="text-xs text-[var(--text-muted)] font-mono uppercase tracking-wider"
            >
              {{ stat.label }}
            </div>
          </div>
        </div>

        <!-- ==========================================================
             DIGITAL CANVAS (REVEAL)
        ========================================================== -->
        <div
          ref="canvasRef"
          class="mb-24 transition-all duration-700 ease-out"
          :class="
            canvasVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          "
        >
          <h3 class="text-2xl font-bold text-[var(--text-primary)] mb-8">
            Digital Canvas
          </h3>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Featured Project -->
            <div
              class="lg:col-span-2 p-8 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/30 relative group hover:border-[var(--border-color)] transition-colors"
            >
              <div
                class="absolute top-6 right-6 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors"
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
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  ></path>
                </svg>
              </div>
              <div class="text-xs font-mono text-purple-400 mb-2">
                Featured Project
              </div>
              <h4 class="text-xl font-bold text-[var(--text-primary)] mb-6">
                Nexus Analytics Dashboard
              </h4>
              <p
                class="text-sm text-[var(--text-muted)] mb-8 max-w-lg leading-relaxed"
              >
                A real-time data visualization platform built with Vue 3 and
                D3.js, featuring customizable widgets and complex state
                management.
              </p>
              <div class="flex gap-3">
                <span
                  v-for="tag in ['Vue', 'TypeScript', 'Tailwind']"
                  :key="tag"
                  class="px-3 py-1 rounded text-xs border border-[var(--border-color)] bg-[var(--bg-secondary)]/50 text-[var(--text-secondary)]"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- Core Stack -->
            <div
              class="p-8 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/30"
            >
              <div class="text-sm font-mono text-[var(--text-muted)] mb-6">
                Core Stack
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div
                  v-for="tech in stack"
                  :key="tech.name"
                  class="flex flex-col items-center justify-center p-4 rounded border border-[var(--border-color)] bg-[var(--bg-secondary)]/30"
                >
                  <div
                    class="w-8 h-8 mb-2 flex items-center justify-center text-[var(--text-muted)]"
                    v-html="tech.icon"
                  ></div>
                  <span class="text-xs text-[var(--text-muted)]">{{
                    tech.name
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ==========================================================
             CONTRIBUTION ACTIVITY (REVEAL)
        ========================================================== -->
        <div
          ref="contributionRef"
          class="p-8 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/30 mb-24 transition-all duration-700 ease-out"
          :class="
            contributionVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          "
        >
          <div class="flex justify-between items-center mb-6">
            <div class="text-sm font-mono text-[var(--text-muted)]">
              Contribution Activity
            </div>
            <div class="text-sm font-mono text-[var(--text-muted)]">
              1,265 contributions in the last year
            </div>
          </div>

          <!-- Heatmap Mockup -->
          <div class="flex gap-1 overflow-x-auto pb-4 justify-center">
            <div v-for="col in 40" :key="col" class="flex flex-col gap-1">
              <div
                v-for="row in 7"
                :key="`${col}-${row}`"
                class="w-3 h-3 rounded-sm"
                :class="getHeatmapColor(col, row)"
              ></div>
            </div>
          </div>

          <div
            class="flex justify-between items-center mt-4 text-xs text-[var(--text-muted)] font-mono"
          >
            <div>Learn how I contribute</div>
            <div class="flex items-center gap-2">
              <span>Less</span>
              <div class="flex gap-1">
                <div
                  v-for="level in [
                    'bg-[var(--bg-secondary)]',
                    'bg-purple-900/40',
                    'bg-purple-700/60',
                    'bg-purple-500',
                    'bg-purple-300',
                  ]"
                  :key="level"
                  class="w-3 h-3 rounded-sm"
                  :class="level"
                ></div>
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useReveal } from "~/composables/useReveal";

// static data
const stats = [
  { value: "4+", label: "Years of Exp" },
  { value: "30+", label: "Projects" },
  { value: "1.2k", label: "GitHub Commits" },
  { value: "12", label: "Certificates" },
];

const stack = [
  {
    name: "Vue.js",
    icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.06 6.3l-3.06 5.31-3.06-5.31h-4.94l8 13.84 8-13.84z"/></svg>',
  },
  {
    name: "Laravel",
    icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 6.5l-10-5.5-10 5.5v11l10 5.5 10-5.5v-11z"/></svg>',
  },
  {
    name: "Tailwind",
    icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>',
  },
  {
    name: "PostgreSQL",
    icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',
  },
];

// Heatmap
const getHeatmapColor = (col: number, row: number) => {
  const val = ((col * 7 + row) * 13) % 100;
  if (val > 85) return "bg-purple-300";
  if (val > 70) return "bg-purple-500";
  if (val > 50) return "bg-purple-700/60";
  if (val > 30) return "bg-purple-900/40";
  return "bg-[var(--bg-secondary)]";
};

// useReveal
const statsRef = ref<HTMLElement | null>(null);
const canvasRef = ref<HTMLElement | null>(null);
const contributionRef = ref<HTMLElement | null>(null);

const { visible: statsVisible } = useReveal(statsRef, { threshold: 0.2 });
const { visible: canvasVisible } = useReveal(canvasRef, { threshold: 0.15 });
const { visible: contributionVisible } = useReveal(contributionRef, {
  threshold: 0.1,
});

// Terminal typing animation
const typedCommand = ref("");
const outputVisible = ref(false);
const visibleLines = ref<string[]>([]);
const typingLine = ref(""); // Baris yang sedang diketik
const isTypingLine = ref(false);
const done = ref(false);

// Data terminal (dengan warna)
const termLines = [
  `"name": <span class="text-yellow-300">"Irfan Khanif"</span>,`,
  `"role": <span class="text-yellow-300">"Frontend Developer"</span>,`,
  `"location": <span class="text-yellow-300">"Remote"</span>,`,
  `"skills": [<span class="text-yellow-300">"Vue.js"</span>, <span class="text-yellow-300">"Laravel"</span>, <span class="text-yellow-300">"TailwindCSS"</span>, <span class="text-yellow-300">"TypeScript"</span>]`,
];

// Teks plain (tanpa HTML) untuk efek typing
const termLinesPlain = termLines.map((line) => line.replace(/<[^>]*>/g, ""));

// Natural delay generator
const getNaturalDelay = (char: string, index: number, total: number) => {
  let base = 60;
  if (index === 0) return 120 + Math.random() * 80;
  if (char === " ") return 100 + Math.random() * 60;
  if (char === "," || char === ":") return 150 + Math.random() * 100;
  if (index === total - 1) return 200 + Math.random() * 100;
  if (Math.random() < 0.08) return 250 + Math.random() * 150;
  return base + Math.random() * 60;
};

// Type Command
const typeCommand = () =>
  new Promise<void>((resolve) => {
    const cmd = "whoami";
    let i = 0;

    const type = () => {
      if (i < cmd.length) {
        typedCommand.value += cmd[i];
        const delay = getNaturalDelay(cmd[i], i, cmd.length);
        i++;
        setTimeout(type, delay);
      } else {
        setTimeout(resolve, 300 + Math.random() * 200);
      }
    };
    type();
  });

// Type satu baris — karakter per karakter
const typeLine = (plainText: string, htmlLine: string): Promise<void> =>
  new Promise((resolve) => {
    typingLine.value = "";
    isTypingLine.value = true;

    let i = 0;
    const total = plainText.length;

    const type = () => {
      if (i < total) {
        typingLine.value += plainText[i];
        const delay = getNaturalDelay(plainText[i], i, total);
        i++;
        setTimeout(type, delay);
      } else {
        // Selesai ngetik baris ini
        isTypingLine.value = false;
        visibleLines.value.push(htmlLine);
        // Jeda sebentar sebelum baris berikutnya
        setTimeout(resolve, 150 + Math.random() * 200);
      }
    };
    type();
  });

// Type semua lines
const typeAllLines = async () => {
  for (let i = 0; i < termLines.length; i++) {
    await typeLine(termLinesPlain[i], termLines[i]);
  }
};

// Start animation — loop forever
const startAnimation = async () => {
  // Reset state
  typedCommand.value = "";
  outputVisible.value = false;
  visibleLines.value = [];
  typingLine.value = "";
  isTypingLine.value = false;
  done.value = false;

  // Jeda awal (terminal siap)
  await new Promise((r) => setTimeout(r, 600 + Math.random() * 300));

  // Type command
  await typeCommand();

  // Jeda sebelum output
  await new Promise((r) => setTimeout(r, 300 + Math.random() * 200));

  // Tampilkan output
  outputVisible.value = true;

  // Tampilkan kurung buka
  await new Promise((r) => setTimeout(r, 200));
  visibleLines.value.push("");

  // Type semua baris
  await typeAllLines();

  // Jeda sebelum prompt selesai
  await new Promise((r) => setTimeout(r, 300 + Math.random() * 200));

  done.value = true;

  // Diam sebentar, lalu ulang
  await new Promise((r) => setTimeout(r, 2500 + Math.random() * 500));

  startAnimation();
};

// Lifecycle
onMounted(() => {
  startAnimation();
});
</script>

<style scoped>
/* Aurora Gradient Text */

@keyframes aurora {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

@keyframes glow {
  0%,
  100% {
    filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.25))
      drop-shadow(0 0 18px rgba(99, 102, 241, 0.15));
  }

  50% {
    filter: drop-shadow(0 0 18px rgba(168, 85, 247, 0.5))
      drop-shadow(0 0 35px rgba(6, 182, 212, 0.25));
  }
}

.aurora-text {
  display: inline-block;

  background: linear-gradient(
    120deg,
    #a855f7,
    #ec4899,
    #3b82f6,
    #06b6d4,
    #22c55e,
    #a855f7
  );

  background-size: 300% 300%;

  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;

  animation:
    aurora 6s ease-in-out infinite,
    glow 3s ease-in-out infinite;
}
</style>
