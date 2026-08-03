<template>
  <div
    class="game-container max-w-2xl mx-auto p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/30 backdrop-blur-sm"
  >
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
      <h2 class="text-2xl font-bold text-[var(--text-primary)]">
        Memory <span class="text-purple-400">Neon</span>
      </h2>
      <div
        class="flex items-center gap-3 text-sm font-mono text-[var(--text-muted)]"
      >
        <span>⏱ {{ timer }}s</span>
        <span>|</span>
        <span>🏆 {{ moves }}</span>
        <span>|</span>
        <span>⭐ {{ matchedPairs }}/{{ totalPairs }}</span>
      </div>
    </div>

    <!-- High Score -->
    <div
      v-if="highScore"
      class="text-xs text-[var(--text-muted)] font-mono mb-3"
    >
      🏅 Best: {{ highScore.moves }} moves in {{ highScore.time }}s
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-4 gap-3 max-w-md mx-auto">
      <button
        v-for="(card, index) in cards"
        :key="index"
        @click="flipCard(index)"
        class="relative aspect-square w-full rounded-xl perspective-1000 focus:outline-none"
        :disabled="card.matched || card.flipped || isLocked || gameFinished"
      >
        <div
          class="relative w-full h-full transition-transform duration-500 transform-style-3d"
          :class="{ 'rotate-y-180': card.flipped || card.matched }"
        >
          <!-- Front (back of card) -->
          <div
            class="absolute inset-0 rounded-xl border-2 border-purple-500/30 bg-[var(--bg-secondary)] flex items-center justify-center text-3xl backface-hidden"
          >
            <span class="text-purple-400/50">❓</span>
          </div>
          <!-- Back (card content) -->
          <div
            class="absolute inset-0 rounded-xl border-2 border-purple-400 bg-purple-500/10 flex items-center justify-center text-4xl rotate-y-180 backface-hidden"
          >
            <span>{{ card.emoji }}</span>
          </div>
        </div>
      </button>
    </div>

    <!-- Controls -->
    <div class="flex flex-wrap justify-center gap-3 mt-6">
      <button
        @click="resetGame"
        class="px-6 py-2 rounded-lg bg-purple-200 text-purple-900 font-semibold hover:bg-purple-300 transition-all duration-300 hover:scale-105"
      >
        🔄 New Game
      </button>
      <button
        @click="resetAll"
        class="px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] hover:bg-[var(--bg-secondary)] transition"
      >
        Reset Stats
      </button>
      <button
        @click="emit('back')"
        class="px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] hover:bg-[var(--bg-secondary)] transition"
      >
        ⬅ Back
      </button>
    </div>

    <!-- Win Modal -->
    <div
      v-if="gameFinished"
      class="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
    >
      <div
        class="bg-[var(--bg-secondary)] rounded-2xl p-8 max-w-sm w-full text-center border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.2)]"
      >
        <div class="text-6xl mb-4">🎉</div>
        <h3 class="text-2xl font-bold text-[var(--text-primary)]">You Win!</h3>
        <p class="text-[var(--text-muted)] mt-2 font-mono">
          {{ moves }} moves • {{ timer }} seconds
        </p>
        <p v-if="isNewHighScore" class="text-purple-400 text-sm font-bold mt-2">
          🏆 New High Score!
        </p>
        <button
          @click="resetGame"
          class="mt-6 px-6 py-2 rounded-lg bg-purple-200 text-purple-900 font-semibold hover:bg-purple-300 transition"
        >
          Play Again
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

// ============================================================
// Types
// ============================================================
interface Card {
  emoji: string;
  flipped: boolean;
  matched: boolean;
  id: number;
}

interface HighScore {
  moves: number;
  time: number;
}

// ============================================================
// Emits
// ============================================================
const emit = defineEmits<{ back: [] }>();

// ============================================================
// Constants
// ============================================================
const EMOJIS = ["🔥", "⚡", "💻", "🎯", "🚀", "🎨", "📱", "🧠"];
const HS_KEY = "memoryHighScore";

// ============================================================
// State
// ============================================================
const cards = ref<Card[]>([]);
const flippedIndexes = ref<number[]>([]);
const matchedPairs = ref(0);
const moves = ref(0);
const timer = ref(0);
const isLocked = ref(false);
const gameFinished = ref(false);
const highScore = ref<HighScore | null>(null);
const isNewHighScore = ref(false);

let timerInterval: ReturnType<typeof setInterval> | null = null;
let flipTimeout: ReturnType<typeof setTimeout> | null = null;

// ============================================================
// Computed
// ============================================================
const totalPairs = computed(() => EMOJIS.length);
const allMatched = () => matchedPairs.value === totalPairs.value;

// ============================================================
// LocalStorage helpers — semua dibungkus import.meta.client
// ============================================================
const loadHighScore = (): HighScore | null => {
  if (!import.meta.client) return null;
  try {
    const stored = localStorage.getItem(HS_KEY);
    return stored ? (JSON.parse(stored) as HighScore) : null;
  } catch {
    return null;
  }
};

const saveHighScore = (score: HighScore) => {
  if (!import.meta.client) return;
  try {
    localStorage.setItem(HS_KEY, JSON.stringify(score));
  } catch {
    /* silent fail */
  }
};

const clearHighScore = () => {
  if (!import.meta.client) return;
  try {
    localStorage.removeItem(HS_KEY);
  } catch {
    /* silent fail */
  }
};

// ============================================================
// Timer helpers
// ============================================================
const startTimer = () => {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    timer.value++;
  }, 1000);
};

const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};

// ============================================================
// Sound Effects
// ============================================================
const playSound = (type: "click" | "match" | "fail" | "win") => {
  if (!import.meta.client) return;
  try {
    const ctx = new (
      window.AudioContext || (window as any).webkitAudioContext
    )();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "click") {
      osc.frequency.value = 500;
      gain.gain.value = 0.08;
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === "match") {
      osc.frequency.value = 700;
      gain.gain.value = 0.1;
      osc.start();
      osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.15);
      osc.stop(ctx.currentTime + 0.2);
    } else if (type === "fail") {
      osc.frequency.value = 300;
      gain.gain.value = 0.08;
      osc.start();
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);
      osc.stop(ctx.currentTime + 0.2);
    } else if (type === "win") {
      osc.frequency.value = 500;
      gain.gain.value = 0.1;
      osc.start();
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3);
      osc.stop(ctx.currentTime + 0.4);
    }
  } catch {
    /* silent fail */
  }
};

// ============================================================
// Game Logic
// ============================================================
const initGame = () => {
  // Bersihkan semua timer & timeout dulu sebelum reset state
  stopTimer();
  if (flipTimeout) {
    clearTimeout(flipTimeout);
    flipTimeout = null;
  }

  cards.value = [...EMOJIS, ...EMOJIS]
    .sort(() => Math.random() - 0.5)
    .map((emoji, index) => ({
      emoji,
      flipped: false,
      matched: false,
      id: index,
    }));

  flippedIndexes.value = [];
  matchedPairs.value = 0;
  moves.value = 0;
  timer.value = 0;
  isLocked.value = false;
  gameFinished.value = false;
  isNewHighScore.value = false;
};

const flipCard = (index: number) => {
  if (isLocked.value || gameFinished.value) return;

  const card = cards.value[index];
  if (card.flipped || card.matched) return;
  if (flippedIndexes.value.length >= 2) return;

  // Mulai timer saat kartu pertama dibalik
  if (moves.value === 0 && flippedIndexes.value.length === 0) {
    startTimer();
  }

  card.flipped = true;
  flippedIndexes.value.push(index);
  playSound("click");

  if (flippedIndexes.value.length === 2) {
    moves.value++;
    isLocked.value = true;

    const [i1, i2] = flippedIndexes.value;
    const c1 = cards.value[i1];
    const c2 = cards.value[i2];

    if (c1.emoji === c2.emoji) {
      // Match
      c1.matched = true;
      c2.matched = true;
      matchedPairs.value++;
      playSound("match");
      flippedIndexes.value = [];
      isLocked.value = false;

      if (allMatched()) finishGame();
    } else {
      // No match — balik balik setelah 800ms
      playSound("fail");
      flipTimeout = setTimeout(() => {
        c1.flipped = false;
        c2.flipped = false;
        flippedIndexes.value = [];
        isLocked.value = false;
        flipTimeout = null;
      }, 800);
    }
  }
};

const finishGame = () => {
  stopTimer();
  gameFinished.value = true;
  playSound("win");

  const current: HighScore = { moves: moves.value, time: timer.value };
  const stored = loadHighScore();

  if (
    !stored ||
    current.moves < stored.moves ||
    (current.moves === stored.moves && current.time < stored.time)
  ) {
    highScore.value = current;
    isNewHighScore.value = true;
    saveHighScore(current);
  } else {
    highScore.value = stored;
  }
};

const resetGame = () => initGame();

const resetAll = () => {
  clearHighScore();
  highScore.value = null;
  initGame();
};

// ============================================================
// Lifecycle
// ============================================================
onMounted(() => {
  highScore.value = loadHighScore();
  initGame();
});

// Fix bug: bersihkan timer saat user navigasi pergi (pencet Back, dll)
onUnmounted(() => {
  stopTimer();
  if (flipTimeout) clearTimeout(flipTimeout);
});
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
.transform-style-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}

button:not(:disabled) .relative {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}
button:not(:disabled):hover .relative {
  transform: scale(1.03);
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.2);
}

@media (max-width: 480px) {
  .game-container {
    padding: 1rem;
  }
  .grid {
    gap: 0.5rem;
  }
  button .text-4xl {
    font-size: 1.8rem;
  }
}
</style>
