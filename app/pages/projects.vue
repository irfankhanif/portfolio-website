<template>
  <div
    class="min-h-screen bg-[var(--bg-primary)] text-[var(--text-secondary)] font-sans selection:bg-purple-500/30"
  >
    <div class="max-w-6xl mx-auto px-6 py-8 pt-24">
      <!-- HEADER -->
      <div class="mb-12">
        <h1
          class="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4"
        >
          Projects
        </h1>
        <p class="text-[var(--text-muted)] text-sm md:text-base max-w-2xl">
          An archive of things I've worked on, ranging from small experiments to
          full-scale applications.
        </p>
      </div>

      <!-- FILTER + SEARCH -->
      <div class="flex flex-wrap items-center gap-3 mb-8">
        <button
          v-for="filter in filters"
          :key="filter"
          @click="activeFilter = filter"
          class="px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300"
          :class="
            activeFilter === filter
              ? 'bg-purple-200 text-purple-900'
              : 'border border-[var(--border-color)] text-[var(--text-muted)] hover:border-purple-500/50'
          "
        >
          {{ filter === "All" ? "ALL" : filter.toUpperCase() }}
        </button>

        <div class="flex-1 min-w-[150px]">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="search_projects"
            class="w-full px-4 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-sm font-mono focus:outline-none focus:border-purple-500/50 transition-colors"
          />
        </div>
      </div>

      <!-- PROJECT CARDS -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <NuxtLink
          v-for="(project, index) in filteredProjects"
          :key="project.id"
          :to="project.slug ? `/games/${project.slug}` : '#'"
          class="group p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/30 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(168,85,247,0.05)] block"
          :style="{ transitionDelay: `${index * 50}ms` }"
        >
          <div class="flex items-start justify-between mb-3">
            <h3
              class="text-lg font-bold text-[var(--text-primary)] group-hover:text-purple-400 transition-colors"
            >
              {{ project.title }}
            </h3>
            <span
              v-if="project.status"
              class="text-[10px] font-mono px-2 py-0.5 rounded-full border border-green-500/30 text-green-400"
            >
              {{ project.status }}
            </span>
          </div>
          <p class="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
            {{ project.description }}
          </p>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tech in project.tech"
              :key="tech"
              class="px-2 py-0.5 text-[10px] font-mono rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)]/50 text-[var(--text-muted)]"
            >
              {{ tech }}
            </span>
          </div>
        </NuxtLink>
      </div>

      <!-- TERMINAL TABLE -->
      <div
        class="rounded-xl border border-[var(--border-color)] bg-[#1e1e1e] overflow-hidden"
      >
        <div
          class="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-color)] bg-[#252526]"
        >
          <div class="w-3 h-3 rounded-full bg-red-500"></div>
          <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div class="w-3 h-3 rounded-full bg-green-500"></div>
          <div class="mx-auto text-xs text-gray-500 font-mono">
            user@node-machine:~/projects/portfolio_/view_projects.sh --limit=5
            --formattable
          </div>
        </div>

        <div class="p-4 font-mono text-xs overflow-x-auto">
          <div class="text-gray-400 mb-2">
            <span class="text-green-400">user@node-machine</span>:<span
              class="text-blue-400"
              >~/projects/portfolio_</span
            >$ ./view_projects.sh --limit=5 --formattable
          </div>

          <table class="w-full border-collapse text-[11px]">
            <thead>
              <tr class="text-gray-400 border-b border-[var(--border-color)]">
                <th class="text-left py-1.5 pr-4 font-mono font-normal">ID</th>
                <th class="text-left py-1.5 pr-4 font-mono font-normal">
                  PROJECT NAME
                </th>
                <th class="text-left py-1.5 pr-4 font-mono font-normal">
                  TECH STACK
                </th>
                <th class="text-left py-1.5 font-mono font-normal">STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in terminalRows"
                :key="row.id"
                class="border-b border-[var(--border-color)]/30 hover:bg-purple-500/5 transition-colors cursor-pointer"
                @click="selectProject(row.slug)"
              >
                <td class="py-1.5 pr-4 text-purple-400 font-mono">
                  #{{ row.id }}
                </td>
                <td class="py-1.5 pr-4 text-[var(--text-secondary)] font-mono">
                  {{ row.name }}
                </td>
                <td class="py-1.5 pr-4 text-[var(--text-muted)] font-mono">
                  {{ row.stack }}
                </td>
                <td class="py-1.5 font-mono">
                  <span
                    class="px-2 py-0.5 rounded-full text-[10px]"
                    :class="{
                      'bg-green-500/20 text-green-400': row.status === 'ACTIVE',
                      'bg-yellow-500/20 text-yellow-400': row.status === 'BETA',
                      'bg-blue-500/20 text-blue-400': row.status === 'STABLE',
                      'bg-purple-500/20 text-purple-400': row.status === 'LIVE',
                    }"
                  >
                    {{ row.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="mt-3 text-gray-500 font-mono text-[10px]">
            [Select project ID to view details or
            <span class="text-purple-400">[q]</span>uit:]
            <span class="animate-pulse">_</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

// ============================================================
// Types
// ============================================================
interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  category: string;
  status: string;
  slug?: string; // hanya game project yang punya
}

interface TerminalRow {
  id: string;
  name: string;
  stack: string;
  status: string;
  slug?: string; // hanya game project yang punya
}

// ============================================================
// Data Projects
// ============================================================
const allProjects: Project[] = [
  {
    id: 1,
    title: "Nexus Dashboard",
    description:
      "A high-performance observability dashboard built for microservice architectures. Features real-time telemetry streaming and advanced query capabilities.",
    tech: ["React", "TypeScript", "WebGL"],
    category: "Web",
    status: "LIVE",
  },
  {
    id: 2,
    title: "Aura CLI",
    description:
      "A robust command-line scaffolding tool designed to bootstrap enterprise-grade monorepos with strict architectural governance.",
    tech: ["Rust", "CLI"],
    category: "CLI",
    status: "STABLE",
  },
  {
    id: 3,
    title: "QuantumLeap",
    description:
      "A quantum-inspired optimization framework for distributed systems.",
    tech: ["Python", "Rust", "Docker"],
    category: "Web",
    status: "ACTIVE",
  },
  {
    id: 4,
    title: "EchoAR Platform",
    description:
      "Augmented reality platform with real-time 3D rendering and spatial computing.",
    tech: ["TypeScript", "Three.js", "Go"],
    category: "Web",
    status: "BETA",
  },
  {
    id: 5,
    title: "DataScripe AI",
    description:
      "AI-powered data analytics and visualization suite with PyTorch integration.",
    tech: ["Go", "Python", "PyTorch"],
    category: "Web",
    status: "STABLE",
  },
  {
    id: 6,
    title: "Portfolio Website",
    description:
      "My personal portfolio built with Nuxt 4, Tailwind CSS, and packed with interactive features.",
    tech: ["Nuxt.js", "Tailwind CSS", "TypeScript"],
    category: "Web",
    status: "LIVE",
  },
  {
    id: 7,
    title: "Design System Kit",
    description:
      "A reusable component library with full theming support and accessibility baked in.",
    tech: ["Vue.js", "Storybook", "CSS Variables"],
    category: "Design Systems",
    status: "STABLE",
  },
  {
    id: 8,
    title: "Neon Tic Tac Toe",
    description:
      "Interactive Tic Tac Toe game with AI opponent, sound effects, confetti celebration, and neon purple theme. Built with Vue 3 and Web Audio API.",
    tech: ["Vue.js", "Tailwind CSS", "TypeScript", "Web Audio API"],
    category: "Web",
    status: "LIVE",
    slug: "tictactoe", // ← slug untuk routing ke /games/tictactoe
  },
  {
    id: 9,
    title: "Neon Memory",
    description:
      "Interactive memory game with neon purple theme and sound effects. Built with Vue 3 and Web Audio API.",
    tech: ["Vue.js", "Tailwind CSS", "TypeScript", "Web Audio API"],
    category: "Web",
    status: "LIVE",
    slug: "neon-memory", // ← slug untuk routing ke /games/neon-memory
  },
];

// ============================================================
// Terminal Rows
// slug di sini harus konsisten dengan allProjects dan GAME_REGISTRY
// ============================================================
const terminalRows: TerminalRow[] = [
  {
    id: "001",
    name: "QuantumLeap",
    stack: "Python, Rust, Docker",
    status: "ACTIVE",
  },
  {
    id: "002",
    name: "EchoAR Platform",
    stack: "TypeScript, Three.js, Go",
    status: "BETA",
  },
  {
    id: "003",
    name: "DataScripe AI",
    stack: "Go, Python, PyTorch",
    status: "STABLE",
  },
  {
    id: "004",
    name: "Portfolio Website",
    stack: "Nuxt.js, Tailwind CSS",
    status: "LIVE",
  },
  {
    id: "005",
    name: "Design System Kit",
    stack: "Vue.js, Storybook",
    status: "STABLE",
  },
  {
    id: "006",
    name: "Neon Tic Tac Toe",
    stack: "Vue.js, Tailwind, Web Audio",
    status: "LIVE",
    slug: "tictactoe",
  },
  {
    id: "007",
    name: "Neon Memory",
    stack: "Vue.js, Tailwind, Web Audio",
    status: "LIVE",
    slug: "neon-memory",
  },
];

// ============================================================
// Filter & Search
// ============================================================
const filters = ["All", "Web", "CLI", "Design Systems"];
const activeFilter = ref("All");
const searchQuery = ref("");

const filteredProjects = computed(() => {
  let filtered = allProjects;
  if (activeFilter.value !== "All") {
    filtered = filtered.filter((p) => p.category === activeFilter.value);
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q)),
    );
  }
  return filtered;
});

// ============================================================
// Select Project (Terminal Table)
// Pakai slug langsung dari row — tidak perlu parseInt lagi
// ============================================================
const selectProject = (slug?: string) => {
  if (slug) {
    navigateTo(`/games/${slug}`);
  }
  // non-game: tidak ada aksi untuk sekarang
};

// ============================================================
// Scroll Reveal
// ============================================================
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  document.querySelectorAll(".group").forEach((card) => observer.observe(card));
});
</script>

<style scoped>
.group {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}

.group:hover {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

.animate-pulse {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

tbody tr {
  transition: background-color 0.2s ease;
}
</style>
