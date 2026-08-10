<template>
  <div
    class="game-container max-w-3xl mx-auto p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/30 backdrop-blur-sm"
  >
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
      <h2 class="text-2xl font-bold text-[var(--text-primary)]">
        Typing <span class="text-purple-400">Speed</span>
      </h2>
      <div
        class="flex items-center gap-3 text-sm font-mono text-[var(--text-muted)]"
      >
        <span>⏱ {{ timer }}s</span>
        <span>|</span>
        <span>⚡ {{ wpm }} WPM</span>
        <span>|</span>
        <span>🎯 {{ accuracy }}%</span>
      </div>
    </div>

    <!-- High Score -->
    <div
      v-if="highScore"
      class="text-xs text-[var(--text-muted)] font-mono mb-3"
    >
      🏅 Best: {{ highScore.wpm }} WPM ({{ highScore.accuracy }}%)
    </div>

    <!-- Terminal Display -->
    <div
      class="relative rounded-xl border border-[var(--border-color)] bg-[#1e1e1e] p-4 font-mono text-sm leading-relaxed min-h-[120px]"
    >
      <!-- Snippet yang harus diketik -->
      <div class="text-gray-400 whitespace-pre-wrap break-words">
        <span
          v-for="(char, index) in snippetChars"
          :key="index"
          class="char-base transition-colors duration-150 relative"
          :class="{
            'text-green-400': char.status === 'correct',
            'text-red-400 char-incorrect': char.status === 'incorrect',
            'char-current text-purple-300': char.status === 'current',
            'text-gray-500': char.status === 'pending',
          }"
          >{{ char.char }}</span
        >
      </div>

      <!-- Cursor blink hint -->
      <div
        v-if="!finished && !started"
        class="absolute bottom-4 right-4 text-xs text-purple-400 animate-pulse"
      >
        Press any key to start...
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="mt-3">
      <div
        class="flex justify-between text-xs font-mono text-[var(--text-muted)] mb-1"
      >
        <span>{{ progressLabel }}</span>
        <span>{{ timer }}s left</span>
      </div>
      <div
        class="w-full h-2 rounded-full bg-[var(--bg-primary)] overflow-hidden border border-[var(--border-color)]"
      >
        <div
          class="h-full rounded-full transition-all duration-1000 ease-linear"
          :class="progressBarColor"
          :style="{ width: progressPercent + '%' }"
        />
      </div>
    </div>

    <!-- Hidden input untuk menangkap keypress -->
    <input
      ref="inputRef"
      type="text"
      class="absolute opacity-0 pointer-events-none"
      @keydown="handleKeydown"
      @focus="handleFocus"
      @blur="handleBlur"
      autofocus
    />

    <!-- Controls -->
    <div class="flex flex-wrap justify-center gap-3 mt-6">
      <button
        @click="resetGame"
        class="px-6 py-2 rounded-lg bg-purple-200 text-purple-900 font-semibold hover:bg-purple-300 transition-all duration-300 hover:scale-105"
      >
        🔄 New Snippet
      </button>
      <button
        @click="resetAll"
        class="px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] hover:bg-[var(--bg-secondary)] transition"
      >
        Reset Stats
      </button>
      <button
        @click="$emit('back')"
        class="px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] hover:bg-[var(--bg-secondary)] transition"
      >
        ⬅ Back
      </button>
    </div>

    <!-- Result Modal -->
    <div
      v-if="finished"
      class="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
    >
      <div
        class="bg-[var(--bg-secondary)] rounded-2xl p-8 max-w-sm w-full text-center border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.2)]"
      >
        <div class="text-6xl mb-4">⌨️</div>
        <h3 class="text-2xl font-bold text-[var(--text-primary)]">
          Time's Up!
        </h3>
        <div class="grid grid-cols-2 gap-4 mt-4 text-sm font-mono">
          <div class="bg-[var(--bg-primary)] p-3 rounded-lg">
            <div class="text-[var(--text-muted)]">WPM</div>
            <div class="text-2xl font-bold text-purple-400">{{ wpm }}</div>
          </div>
          <div class="bg-[var(--bg-primary)] p-3 rounded-lg">
            <div class="text-[var(--text-muted)]">Accuracy</div>
            <div class="text-2xl font-bold text-green-400">{{ accuracy }}%</div>
          </div>
          <div class="bg-[var(--bg-primary)] p-3 rounded-lg col-span-2">
            <div class="text-[var(--text-muted)]">Characters</div>
            <div class="text-lg font-bold text-[var(--text-primary)]">
              {{ correctChars }}/{{ totalTyped }} correct
            </div>
          </div>
        </div>
        <p v-if="isNewHighScore" class="text-purple-400 text-sm font-bold mt-2">
          🏆 New High Score!
        </p>
        <button
          @click="resetGame"
          class="mt-6 px-6 py-2 rounded-lg bg-purple-200 text-purple-900 font-semibold hover:bg-purple-300 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";

// ============================================================
// Props & Emits
// ============================================================
const emit = defineEmits<{
  back: [];
}>();

// ============================================================
// Snippets
// ============================================================
const snippets = [
  // JavaScript
  'const greet = (name) => `Hello, ${name}!`; console.log(greet("World"));',
  "function sum(a, b) { return a + b; } const result = sum(5, 3);",
  "const numbers = [1, 2, 3, 4, 5]; const doubled = numbers.map(n => n * 2);",
  "class Person { constructor(name) { this.name = name; } sayHi() { console.log(`Hi, I'm ${this.name}`); } }",
  'fetch("/api/data").then(res => res.json()).then(data => console.log(data));',
  // Python
  'def hello(name): print(f"Hello, {name}!")',
  "numbers = [1, 2, 3, 4, 5] doubled = [n * 2 for n in numbers]",
  "class Person: def __init__(self, name): self.name = name",
  'with open("file.txt", "r") as f: content = f.read()',
  "def factorial(n): return 1 if n <= 1 else n * factorial(n-1)",
  // HTML
  '<div class="container"><h1>Hello World</h1><p>This is a paragraph.</p></div>',
  '<nav><ul><li><a href="/">Home</a></li><li><a href="/about">About</a></li></ul></nav>',
  // CSS
  ".container { display: flex; justify-content: center; align-items: center; }",
  "@media (max-width: 768px) { .container { flex-direction: column; } }",
  ".btn { padding: 0.5rem 1rem; background: purple; color: white; border-radius: 8px; }",
  // TypeScript
  "interface User { id: number; name: string; email?: string; }",
  "type Result<T> = { success: true; data: T } | { success: false; error: string };",
  "const greet = (name: string): string => `Hello, ${name}`;",
  "const numbers: number[] = [1, 2, 3]; const doubled = numbers.map((n) => n * 2);",
];

// ============================================================
// State
// ============================================================
const inputRef = ref<HTMLInputElement | null>(null);
const currentSnippet = ref("");
const snippetChars = ref<
  { char: string; status: "pending" | "current" | "correct" | "incorrect" }[]
>([]);
const currentIndex = ref(0);
const totalTyped = ref(0);
const correctChars = ref(0);
const timer = ref(30);
const started = ref(false);
const finished = ref(false);
const highScore = ref<{ wpm: number; accuracy: number } | null>(null);
const isNewHighScore = ref(false);

let timerInterval: ReturnType<typeof setInterval> | null = null;
let isFocused = true;

// ============================================================
// Computed
// ============================================================
const wpm = computed(() => {
  const elapsed = 30 - timer.value;
  if (elapsed === 0) return 0;
  const words = correctChars.value / 5;
  return Math.round((words / elapsed) * 60);
});

const accuracy = computed(() => {
  if (totalTyped.value === 0) return 0;
  return Math.round((correctChars.value / totalTyped.value) * 100);
});

const progressPercent = computed(() => {
  return (timer.value / 30) * 100;
});

const progressBarColor = computed(() => {
  if (timer.value <= 5) return "bg-red-500";
  if (timer.value <= 10) return "bg-yellow-400";
  return "bg-purple-500";
});

const progressLabel = computed(() => {
  if (!started.value) return "Ready";
  if (timer.value <= 5) return "⚠ Hurry!";
  if (timer.value <= 10) return "🔥 Almost done";
  return "⏳ Keep going";
});

// ============================================================
// Sound Effects
// ============================================================
const playSound = (type: "click" | "error" | "finish") => {
  if (typeof window === "undefined") return;
  try {
    const audioCtx = new (
      window.AudioContext || (window as any).webkitAudioContext
    )();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (type === "click") {
      oscillator.frequency.value = 600;
      gainNode.gain.value = 0.06;
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.04);
    } else if (type === "error") {
      oscillator.frequency.value = 200;
      gainNode.gain.value = 0.06;
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
    } else if (type === "finish") {
      oscillator.frequency.value = 500;
      gainNode.gain.value = 0.08;
      oscillator.start();
      oscillator.frequency.exponentialRampToValueAtTime(
        800,
        audioCtx.currentTime + 0.3,
      );
      oscillator.stop(audioCtx.currentTime + 0.4);
    }
  } catch (_) {
    /* silent fail */
  }
};

// ============================================================
// Game Logic
// ============================================================
const initGame = () => {
  const random = snippets[Math.floor(Math.random() * snippets.length)];
  currentSnippet.value = random;
  snippetChars.value = random.split("").map((char) => ({
    char,
    status: "pending",
  }));
  currentIndex.value = 0;
  totalTyped.value = 0;
  correctChars.value = 0;
  timer.value = 30;
  started.value = false;
  finished.value = false;
  isNewHighScore.value = false;
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  if (snippetChars.value.length > 0) {
    snippetChars.value[0].status = "current";
  }
  nextTick(() => {
    inputRef.value?.focus();
  });
};

const startTimer = () => {
  if (started.value) return;
  started.value = true;
  timerInterval = setInterval(() => {
    timer.value--;
    if (timer.value <= 0) {
      finishGame();
    }
  }, 1000);
};

const finishGame = () => {
  finished.value = true;
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  playSound("finish");

  const wpmVal = wpm.value;
  const accVal = accuracy.value;
  const stored = localStorage.getItem("typingHighScore");
  const current = { wpm: wpmVal, accuracy: accVal };

  if (stored) {
    const parsed = JSON.parse(stored);
    if (wpmVal > parsed.wpm) {
      highScore.value = current;
      isNewHighScore.value = true;
      localStorage.setItem("typingHighScore", JSON.stringify(current));
    } else {
      highScore.value = parsed;
    }
  } else {
    highScore.value = current;
    isNewHighScore.value = true;
    localStorage.setItem("typingHighScore", JSON.stringify(current));
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (finished.value) return;
  if (e.key === " ") {
    e.preventDefault();
  }
  if (e.key.length === 1 || e.key === " ") {
    if (!started.value) {
      startTimer();
    }
    const char = e.key;
    const expected = snippetChars.value[currentIndex.value];
    if (!expected) return;

    playSound("click");
    totalTyped.value++;

    if (char === expected.char) {
      expected.status = "correct";
      correctChars.value++;
    } else {
      expected.status = "incorrect";
      playSound("error");
    }

    currentIndex.value++;
    if (currentIndex.value < snippetChars.value.length) {
      snippetChars.value[currentIndex.value].status = "current";
    } else {
      finishGame();
    }
  }
};

const resetGame = () => {
  initGame();
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};

const resetAll = () => {
  localStorage.removeItem("typingHighScore");
  highScore.value = null;
  resetGame();
};

// ============================================================
// Focus handlers
// ============================================================
const handleFocus = () => {
  isFocused = true;
};
const handleBlur = () => {
  isFocused = false;
};

const handleContainerClick = () => {
  inputRef.value?.focus();
};

// ============================================================
// Lifecycle
// ============================================================
onMounted(() => {
  const stored = localStorage.getItem("typingHighScore");
  if (stored) {
    highScore.value = JSON.parse(stored);
  }
  initGame();
  nextTick(() => {
    inputRef.value?.focus();
  });
  document.addEventListener("click", handleContainerClick);
});

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  document.removeEventListener("click", handleContainerClick);
});
</script>

<style scoped>
/* Cursor blink animation */
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

/* Pulse for "Press any key" hint */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.animate-pulse {
  animation: pulse 1s step-end infinite;
}

/* Base char */
.char-base {
  display: inline;
}

/* Current character — highlight background + blinking underline */
.char-current {
  position: relative;
  background-color: rgba(168, 85, 247, 0.15);
  border-radius: 2px;
  padding-bottom: 1px;
}

.char-current::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: #a855f7;
  border-radius: 1px;
  animation: blink 1s step-end infinite;
}

/* Incorrect character — subtle red background */
.char-incorrect {
  background-color: rgba(239, 68, 68, 0.15);
  border-radius: 2px;
}
</style>
