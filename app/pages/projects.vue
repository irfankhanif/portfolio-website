<template>
  <div>
    <div
      class="min-h-screen bg-[#111113]/80 text-gray-300 font-sans selection:bg-purple-500/30"
    >
      <div class="max-w-6xl mx-auto px-6 py-8">
        <!-- Navigation -->

        <!-- Hero Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <!-- Left: Intro -->
          <div>
            <div
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-700 bg-gray-800/50 mb-6"
            >
              <span class="w-2 h-2 rounded-full bg-green-500"></span>
              <span class="text-xs text-gray-300 font-mono"
                >Available for new opportunities</span
              >
            </div>
            <h1 class="text-5xl font-bold text-white mb-4 tracking-tight">
              Hi, I'm
              <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600"
                >Irfan Khanif</span
              >
            </h1>
            <h2 class="text-xl text-gray-200 mb-6 leading-relaxed">
              Frontend Developer specializing in high-performance digital
              experiences.
            </h2>
            <p class="text-gray-400 mb-8 text-sm leading-relaxed max-w-md">
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
                class="flex items-center gap-2 px-6 py-3 rounded border border-gray-700 hover:bg-gray-800 transition-colors text-sm font-medium text-white"
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

          <!-- Right: Terminal -->
          <div
            class="rounded-xl border border-gray-700 bg-[#1e1e1e] shadow-2xl overflow-hidden"
          >
            <!-- Title Bar -->
            <div
              class="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-[#252526]"
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
              <div class="text-green-400 mb-2">
                ➜ ~ <span>{{ typedCommand }}</span
                ><span v-if="!outputVisible" class="animate-pulse">_</span>
              </div>

              <div v-if="outputVisible">
                <div class="text-gray-300 mb-1">{</div>
                <div
                  v-for="(line, i) in visibleLines"
                  :key="i"
                  class="pl-4 mb-1"
                  v-html="line"
                ></div>
                <div
                  v-if="visibleLines.length >= termLines.length"
                  class="text-gray-300 mb-4"
                >
                  }
                </div>
              </div>

              <div v-if="done" class="text-green-400">
                ➜ ~ <span class="animate-pulse">_</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="p-6 rounded-xl border border-gray-800 bg-gray-900/50 flex flex-col items-center justify-center text-center"
          >
            <div class="text-2xl font-bold text-white mb-1">
              {{ stat.value }}
            </div>
            <div
              class="text-xs text-gray-500 font-mono uppercase tracking-wider"
            >
              {{ stat.label }}
            </div>
          </div>
        </div>

        <!-- Digital Canvas -->
        <div class="mb-24">
          <h3 class="text-2xl font-bold text-white mb-8">Digital Canvas</h3>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Featured Project -->
            <div
              class="lg:col-span-2 p-8 rounded-xl border border-gray-800 bg-gray-900/30 relative group hover:border-gray-700 transition-colors"
            >
              <div
                class="absolute top-6 right-6 text-gray-500 group-hover:text-white transition-colors"
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
              <h4 class="text-xl font-bold text-white mb-6">
                Nexus Analytics Dashboard
              </h4>
              <p class="text-sm text-gray-400 mb-8 max-w-lg leading-relaxed">
                A real-time data visualization platform built with Vue 3 and
                D3.js, featuring customizable widgets and complex state
                management.
              </p>
              <div class="flex gap-3">
                <span
                  class="px-3 py-1 rounded text-xs border border-gray-700 bg-gray-800/50 text-gray-300"
                  >Vue</span
                >
                <span
                  class="px-3 py-1 rounded text-xs border border-gray-700 bg-gray-800/50 text-gray-300"
                  >TypeScript</span
                >
                <span
                  class="px-3 py-1 rounded text-xs border border-gray-700 bg-gray-800/50 text-gray-300"
                  >Tailwind</span
                >
              </div>
            </div>

            <!-- Core Stack -->
            <div class="p-8 rounded-xl border border-gray-800 bg-gray-900/30">
              <div class="text-sm font-mono text-gray-400 mb-6">Core Stack</div>
              <div class="grid grid-cols-2 gap-4">
                <div
                  v-for="tech in stack"
                  :key="tech.name"
                  class="flex flex-col items-center justify-center p-4 rounded border border-gray-800 bg-gray-800/30"
                >
                  <div
                    class="w-8 h-8 mb-2 flex items-center justify-center text-gray-400"
                    v-html="tech.icon"
                  ></div>
                  <span class="text-xs text-gray-400">{{ tech.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contribution Activity -->
        <div class="p-8 rounded-xl border border-gray-800 bg-gray-900/30 mb-24">
          <div class="flex justify-between items-center mb-6">
            <div class="text-sm font-mono text-gray-400">
              Contribution Activity
            </div>
            <div class="text-sm font-mono text-gray-400">
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
            class="flex justify-between items-center mt-4 text-xs text-gray-500 font-mono"
          >
            <div>Learn how I contribute</div>
            <div class="flex items-center gap-2">
              <span>Less</span>
              <div class="flex gap-1">
                <div class="w-3 h-3 rounded-sm bg-gray-800"></div>
                <div class="w-3 h-3 rounded-sm bg-purple-900/40"></div>
                <div class="w-3 h-3 rounded-sm bg-purple-700/60"></div>
                <div class="w-3 h-3 rounded-sm bg-purple-500"></div>
                <div class="w-3 h-3 rounded-sm bg-purple-300"></div>
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// ============================================================
// Static Data
// ============================================================
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

// ============================================================
// Heatmap
// ============================================================
const getHeatmapColor = (col, row) => {
  const val = ((col * 7 + row) * 13) % 100;
  if (val > 85) return "bg-purple-300";
  if (val > 70) return "bg-purple-500";
  if (val > 50) return "bg-purple-700/60";
  if (val > 30) return "bg-purple-900/40";
  return "bg-gray-800";
};

// ============================================================
// Terminal Animation
// ============================================================
const typedCommand = ref("");
const outputVisible = ref(false);
const visibleLines = ref([]);
const done = ref(false);

const termLines = [
  `"name": <span class="text-yellow-300">"Irfan Khanif"</span>,`,
  `"role": <span class="text-yellow-300">"Frontend Developer"</span>,`,
  `"location": <span class="text-yellow-300">"Remote"</span>,`,
  `"skills": [<span class="text-yellow-300">"Vue.js"</span>, <span class="text-yellow-300">"Laravel"</span>, <span class="text-yellow-300">"TailwindCSS"</span>, <span class="text-yellow-300">"TypeScript"</span>]`,
];

const randomDelay = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const typeCommand = () =>
  new Promise((resolve) => {
    let i = 0;
    const type = () => {
      if (i < "whoami".length) {
        typedCommand.value += "whoami"[i++];
        setTimeout(type, randomDelay(60, 150));
      } else {
        resolve();
      }
    };
    type();
  });

const showLines = () =>
  new Promise((resolve) => {
    let i = 0;
    const next = () => {
      if (i < termLines.length) {
        visibleLines.value.push(termLines[i++]);
        setTimeout(next, randomDelay(150, 350));
      } else {
        resolve();
      }
    };
    setTimeout(next, 300);
  });

const startAnimation = async () => {
  typedCommand.value = "";
  outputVisible.value = false;
  visibleLines.value = [];
  done.value = false;

  await new Promise((r) => setTimeout(r, 500));
  await typeCommand();
  await new Promise((r) => setTimeout(r, 400));
  outputVisible.value = true;
  await showLines();
  await new Promise((r) => setTimeout(r, 300));
  done.value = true;
  await new Promise((r) => setTimeout(r, 2500));
  startAnimation();
};

// ============================================================
// Lifecycle
// ============================================================
onMounted(() => {
  startAnimation();
});
</script>
