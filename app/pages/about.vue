<template>
  <div
    class="min-h-screen bg-[#111113]/80 text-gray-300 font-sans selection:bg-purple-500/30"
  >
    <div class="max-w-5xl mx-auto px-6 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32">
        <!-- Left: Image Profile -->
        <div
          class="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-gray-800 shadow-2xl bg-gray-900 group"
        >
          <img
            src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=800&auto=format&fit=crop"
            alt="Profile Image"
            class="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-transparent opacity-60"
          ></div>
        </div>

        <!-- Right: Content -->
        <div>
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-900/50 bg-purple-900/20 mb-6"
          >
            <span
              class="w-2 h-2 rounded-full bg-purple-500 animate-pulse"
            ></span>
            <span class="text-xs text-purple-300 font-mono"
              >Available for projects</span
            >
          </div>

          <h1
            class="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight leading-tight"
          >
            Architecting digital experiences with
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600"
              >precision.</span
            >
          </h1>

          <!-- Terminal Block -->
          <div class="font-mono text-sm mb-8 space-y-2">
            <div class="text-gray-400">
              <span class="text-purple-400">></span> system.init(<span
                class="text-green-400"
                >"Irfan Khanif"</span
              >)
            </div>
            <div class="text-gray-400">
              <span class="text-purple-400">></span> status:
              <span class="text-green-400"
                >"Obsessed with performance and elegant UI architectures"</span
              >
            </div>
          </div>

          <p class="text-gray-400 mb-10 text-sm md:text-base leading-relaxed">
            With over 6 years of technical craftsmanship, I specialize in
            bridging the gap between complex engineering and intuitive user
            interfaces. My approach is rooted in the belief that code should be
            as clean as the visuals it produces. I don't just build websites; I
            engineer scalable digital systems that stand the test of time and
            traffic.
          </p>

          <div class="flex items-center gap-8 border-t border-gray-800 pt-6">
            <div>
              <div class="text-2xl font-bold text-white">6+</div>
              <div class="text-xs text-gray-500 uppercase tracking-wider">
                Years Exp.
              </div>
            </div>
            <div>
              <div class="text-2xl font-bold text-white">40+</div>
              <div class="text-xs text-gray-500 uppercase tracking-wider">
                Deployments
              </div>
            </div>
            <div>
              <div class="text-2xl font-bold text-white">12</div>
              <div class="text-xs text-gray-500 uppercase tracking-wider">
                Open Source
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Career Journey (Timeline) - REVEAL -->
      <div
        ref="timelineRef"
        class="mb-32 transition-all duration-700 ease-out"
        :class="
          timelineVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        "
      >
        <div class="flex justify-between items-end mb-10">
          <div>
            <div
              class="text-xs font-bold tracking-widest text-purple-500 uppercase mb-2"
            >
              Timeline
            </div>
            <h2 class="text-3xl font-bold text-white">Career Journey</h2>
          </div>
          <div
            class="hidden sm:flex items-center gap-2 text-sm text-gray-500 font-mono"
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            Tracing the evolution of code
          </div>
        </div>

        <div class="space-y-6">
          <div
            v-for="(job, index) in timeline"
            :key="index"
            class="p-8 rounded-xl border border-gray-800 bg-[#161618] relative group hover:border-gray-700 transition-colors"
            :style="{ transitionDelay: `${index * 100}ms` }"
          >
            <div
              class="absolute left-0 top-10 w-1 h-8 bg-purple-500 rounded-r-md opacity-50 group-hover:opacity-100 transition-opacity"
            ></div>

            <div
              class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2"
            >
              <h3 class="text-xl font-bold text-white">{{ job.role }}</h3>
              <span class="text-sm text-gray-500 font-mono">{{
                job.period
              }}</span>
            </div>

            <div
              class="text-xs font-mono text-gray-500 mb-4 uppercase tracking-wider"
            >
              {{ job.stack }}
            </div>

            <p class="text-sm text-gray-400 leading-relaxed max-w-3xl">
              {{ job.desc }}
            </p>
          </div>
        </div>
      </div>

      <!-- Core Values - REVEAL -->
      <div
        ref="coreValuesRef"
        class="mb-32 transition-all duration-700 ease-out"
        :class="
          coreValuesVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        "
      >
        <div class="text-center mb-12">
          <div
            class="text-xs font-bold tracking-widest text-green-500 uppercase mb-2"
          >
            Philosophy
          </div>
          <h2 class="text-3xl font-bold text-white">Core Values</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(value, index) in coreValues"
            :key="index"
            class="p-8 rounded-xl border border-gray-800 bg-[#161618] flex flex-col items-center text-center hover:bg-gray-800/50 transition-colors"
            :style="{ transitionDelay: `${index * 80}ms` }"
          >
            <div
              class="w-12 h-12 rounded-full bg-purple-900/20 text-purple-400 flex items-center justify-center mb-6"
              v-html="value.icon"
            ></div>
            <h4 class="text-lg font-bold text-white mb-4">{{ value.title }}</h4>
            <p class="text-sm text-gray-400 leading-relaxed">
              {{ value.desc }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useReveal } from "~/composables/useReveal";

// Data Timeline & Core Values
const timeline = [
  {
    role: "Senior Frontend Engineer",
    period: "2021 — Present",
    stack: "TECH STACK: REACT, NEXT.JS, TYPESCRIPT, TAILWIND",
    desc: "Leading the frontend architectural decisions for high-scale enterprise applications. Focused on optimizing Core Web Vitals and implementing robust Design Systems that serve multiple product lines.",
  },
  {
    role: "UI Developer",
    period: "2019 — 2021",
    stack: "FOCUS: ANIMATION, CSS-IN-JS, COMPONENT LIBRARIES",
    desc: "Transformed complex Figma prototypes into interactive, pixel-perfect reality. Built a custom UI library used by over 50 developers internally, reducing time-to-market by 30%.",
  },
  {
    role: "Junior Web Developer",
    period: "2017 — 2019",
    stack: "FOUNDATION: HTML5, CSS3, JAVASCRIPT, PHP",
    desc: "Mastered the fundamentals of the web. Responsible for maintaining legacy codebases while advocating for modern JavaScript adoption within the small agency team.",
  },
];

const coreValues = [
  {
    title: "Structural Integrity",
    desc: "Building codebases that are modular, readable, and ready for long-term evolution.",
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>',
  },
  {
    title: "Performance First",
    desc: "Every millisecond counts. Optimization is not an afterthought, but a core requirement.",
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>',
  },
  {
    title: "Design Empathy",
    desc: "Understanding user intent to create interfaces that feel natural and human-centric.",
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>',
  },
  {
    title: "Continuous Learning",
    desc: "The stack evolves, and so do I. Embracing new paradigms with a student's mindset.",
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>',
  },
];

// Refs & useReveal
const timelineRef = ref<HTMLElement | null>(null);
const coreValuesRef = ref<HTMLElement | null>(null);

const { visible: timelineVisible } = useReveal(timelineRef, {
  threshold: 0.15,
});
const { visible: coreValuesVisible } = useReveal(coreValuesRef, {
  threshold: 0.15,
});
</script>
