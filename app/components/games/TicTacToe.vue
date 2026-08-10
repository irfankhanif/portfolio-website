<template>
  <!-- SELECTION SCREEN -->
  <div
    v-if="!gameStarted"
    class="game-container max-w-md mx-auto p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/30 backdrop-blur-sm"
  >
    <div class="text-center">
      <h2 class="text-2xl font-bold text-[var(--text-primary)] mb-2">
        Tic Tac Toe <span class="text-purple-400">Neon</span>
      </h2>
      <p class="text-[var(--text-muted)] text-sm mb-6">Choose your game mode</p>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <button
          @click="selectMode('pvp')"
          class="p-4 rounded-xl border border-purple-500/30 bg-[var(--bg-secondary)] hover:border-purple-400 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all duration-300 group"
          :class="{ 'border-purple-400': selectedMode === 'pvp' }"
        >
          <div class="text-3xl mb-2">👥</div>
          <h3
            class="text-base font-bold text-[var(--text-primary)] group-hover:text-purple-400 transition-colors"
          >
            2 Players
          </h3>
          <p class="text-xs text-[var(--text-muted)]">Play with a friend</p>
        </button>

        <button
          @click="selectMode('pve')"
          class="p-4 rounded-xl border border-purple-500/30 bg-[var(--bg-secondary)] hover:border-purple-400 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all duration-300 group"
          :class="{ 'border-purple-400': selectedMode === 'pve' }"
        >
          <div class="text-3xl mb-2">🤖</div>
          <h3
            class="text-base font-bold text-[var(--text-primary)] group-hover:text-purple-400 transition-colors"
          >
            vs AI
          </h3>
          <p class="text-xs text-[var(--text-muted)]">Challenge the computer</p>
        </button>
      </div>

      <!-- [FITUR 3] Pilih simbol — muncul setelah mode dipilih -->
      <div v-if="selectedMode" class="mb-6">
        <p class="text-sm text-[var(--text-muted)] mb-2">
          {{ selectedMode === "pve" ? "You play as" : "Player 1 plays as" }}
        </p>
        <div class="flex justify-center gap-3">
          <button
            v-for="sym in ['X', 'O'] as const"
            :key="sym"
            @click="playerSymbol = sym"
            class="w-12 h-12 rounded-xl text-xl font-bold border-2 transition-all duration-300"
            :class="
              playerSymbol === sym
                ? sym === 'X'
                  ? 'border-purple-400 text-purple-400 bg-purple-500/10'
                  : 'border-cyan-400 text-cyan-400 bg-cyan-500/10'
                : 'border-[var(--border-color)] text-[var(--text-muted)] hover:border-purple-500/50'
            "
          >
            {{ sym }}
          </button>
        </div>
      </div>

      <div v-if="selectedMode === 'pve'" class="mb-6">
        <p class="text-sm text-[var(--text-muted)] mb-2">Select AI Level</p>
        <div class="flex justify-center gap-3">
          <button
            v-for="level in ['easy', 'medium', 'hard'] as const"
            :key="level"
            @click="aiLevel = level"
            class="px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300"
            :class="
              aiLevel === level
                ? 'bg-purple-200 text-purple-900'
                : 'border border-[var(--border-color)] text-[var(--text-muted)] hover:border-purple-500/50'
            "
          >
            {{ level.toUpperCase() }}
          </button>
        </div>
      </div>

      <button
        @click="startGame"
        :disabled="!selectedMode || (selectedMode === 'pve' && !aiLevel)"
        class="inline-flex items-center gap-2 px-8 py-2.5 rounded-lg bg-purple-200 text-purple-900 font-semibold hover:bg-purple-300 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>Start Game</span>

        <img
          src="/assets/images/icon/ic-play.svg"
          alt="Play Icon"
          class="w-4 h-4"
        />
      </button>

      <button
        @click="$emit('back')"
        class="block mt-4 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition mx-auto"
      >
        ← Back to Projects
      </button>
    </div>
  </div>

  <!-- GAME SCREEN -->
  <div
    v-else
    class="game-container max-w-md mx-auto p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/30 backdrop-blur-sm"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl font-bold text-[var(--text-primary)]">
        Tic Tac Toe <span class="text-purple-400">Neon</span>
      </h2>
      <span
        class="px-3 py-1 text-xs rounded-full border border-purple-500/30 text-purple-400"
      >
        {{ gameMode === "pvp" ? "👥 2 Players" : `🤖 AI (${aiLevel})` }}
      </span>
    </div>

    <!-- [FITUR 1] Score Board dengan active turn indicator -->
    <div class="flex justify-around gap-4 mb-4 font-mono">
      <!-- X -->
      <div
        class="flex-1 text-center py-2 rounded-xl transition-all duration-300"
        :class="
          isActiveTurn('X')
            ? 'bg-purple-500/10 border border-purple-400/50 scale-105'
            : 'border border-transparent'
        "
      >
        <div class="flex items-center justify-center gap-1.5 mb-0.5">
          <!-- Arrow indicator giliran -->
          <span
            class="text-purple-400 transition-all duration-300"
            :class="isActiveTurn('X') ? 'opacity-100' : 'opacity-0'"
            >▶</span
          >
          <span class="text-purple-400 font-bold text-sm">{{
            symbolLabel("X")
          }}</span>
        </div>
        <div
          class="text-2xl font-bold transition-all duration-300"
          :class="
            isActiveTurn('X') ? 'text-purple-400' : 'text-[var(--text-muted)]'
          "
        >
          {{ scores[playerSymbol] }}
        </div>
        <div class="text-xs text-[var(--text-muted)] mt-0.5">
          {{ gameMode === "pve" ? "You" : "P1" }}
        </div>
      </div>

      <!-- Draw -->
      <div class="text-center py-2 px-3">
        <div class="text-gray-400 text-sm mb-0.5">Draw</div>
        <div class="text-2xl font-bold text-[var(--text-muted)]">
          {{ scores.draw }}
        </div>
      </div>

      <!-- O -->
      <div
        class="flex-1 text-center py-2 rounded-xl transition-all duration-300"
        :class="
          isActiveTurn('O')
            ? 'bg-cyan-500/10 border border-cyan-400/50 scale-105'
            : 'border border-transparent'
        "
      >
        <div class="flex items-center justify-center gap-1.5 mb-0.5">
          <span class="text-cyan-400 font-bold text-sm">{{
            symbolLabel("O")
          }}</span>
          <span
            class="text-cyan-400 transition-all duration-300"
            :class="isActiveTurn('O') ? 'opacity-100' : 'opacity-0'"
            >◀</span
          >
        </div>
        <div
          class="text-2xl font-bold transition-all duration-300"
          :class="
            isActiveTurn('O') ? 'text-cyan-400' : 'text-[var(--text-muted)]'
          "
        >
          {{ scores[opponentSymbol] }}
        </div>
        <div class="text-xs text-[var(--text-muted)] mt-0.5">
          {{ gameMode === "pve" ? "AI" : "P2" }}
        </div>
      </div>
    </div>

    <!-- Status -->
    <div
      class="text-center text-sm font-mono text-[var(--text-secondary)] mb-4 min-h-[1.5rem]"
    >
      {{ status }}
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-3 gap-3 max-w-xs mx-auto">
      <button
        v-for="(cell, i) in board"
        :key="i"
        @click="makeMove(i)"
        class="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl border-2 border-purple-500/30 bg-[var(--bg-secondary)] text-4xl font-bold transition-all duration-300 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
        :class="{
          'text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]':
            cell === playerSymbol,
          'text-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.2)]':
            cell === opponentSymbol,
          'opacity-50 cursor-not-allowed': isDisabled(i),
          'animate-pulse-glow': winningCells.includes(i),
          // [FITUR 4] Animasi muncul per cell
          'animate-cell-pop': cellAnimating === i,
        }"
        :disabled="isDisabled(i)"
      >
        {{ cell }}
      </button>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-wrap justify-center gap-3 mt-6">
      <button
        @click="resetGame"
        class="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-purple-200 text-purple-900 font-semibold hover:bg-purple-300 transition-all duration-300 hover:scale-105"
      >
        <img
          src="/assets/images/icon/ic-play.svg"
          alt="Play Icon"
          class="w-5 h-5"
        />
        <span>New Game</span>
      </button>
      <button
        @click="resetScores"
        class="px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] hover:bg-[var(--bg-secondary)] transition"
      >
        Reset Scores
      </button>
      <button
        @click="backToSelection"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] hover:bg-[var(--bg-secondary)] transition"
      >
        <img
          src="/assets/images/icon/ic-refresh.svg"
          alt="Refresh Icon"
          class="w-5 h-5"
        />
        <span>Change Mode</span>
      </button>
    </div>

    <!-- Confetti -->
    <div
      v-if="showConfetti"
      class="fixed inset-0 pointer-events-none z-50 overflow-hidden"
    >
      <div
        v-for="i in 50"
        :key="i"
        class="absolute w-2 h-2 rounded-full"
        :style="{
          left: Math.random() * 100 + '%',
          top: '-10px',
          backgroundColor: `hsl(${Math.random() * 360}, 80%, 60%)`,
          animation: `confetti-fall ${2 + Math.random() * 2}s linear forwards`,
          animationDelay: Math.random() * 0.5 + 's',
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// ============================================================
// Props & Emits
// ============================================================
defineEmits<{ back: [] }>();

// ============================================================
// Types
// ============================================================
type Player = "X" | "O";
type AiLevel = "easy" | "medium" | "hard";
type GameMode = "pvp" | "pve";
type Board = string[];

// ============================================================
// State: Selection
// ============================================================
const gameStarted = ref(false);
const selectedMode = ref<GameMode | null>(null);
const aiLevel = ref<AiLevel>("easy");
const gameMode = ref<GameMode>("pvp");

// [FITUR 3] Pilihan simbol player 1 (default X)
const playerSymbol = ref<Player>("X");
const opponentSymbol = computed<Player>(() =>
  playerSymbol.value === "X" ? "O" : "X",
);

// ============================================================
// State: Game
// ============================================================
const board = ref<Board>(Array(9).fill(""));
const currentPlayer = ref<Player>("X");
const winner = ref<string | null>(null);
const winningCells = ref<number[]>([]);
const scores = ref<Record<Player | "draw", number>>({ X: 0, O: 0, draw: 0 });
const showConfetti = ref(false);
const isAIProcessing = ref(false);

// [FITUR 4] Track index cell yang baru saja diisi untuk animasi pop
const cellAnimating = ref<number | null>(null);

// ============================================================
// Constants
// ============================================================
const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

// ============================================================
// Computed
// ============================================================
const isDraw = computed(() => !winner.value && board.value.every(Boolean));

const status = computed(() => {
  if (winner.value === "draw") return "🤝 Draw!";
  if (winner.value) {
    const isPlayerWin = winner.value === playerSymbol.value;
    if (gameMode.value === "pve")
      return isPlayerWin ? "🏆 You win!" : "🤖 AI wins!";
    return `🏆 Player ${winner.value === playerSymbol.value ? "1" : "2"} wins!`;
  }
  if (isDraw.value) return "🤝 Draw!";
  if (
    gameMode.value === "pve" &&
    currentPlayer.value === opponentSymbol.value &&
    !isAIProcessing.value
  )
    return "🤖 AI is thinking...";
  if (gameMode.value === "pve")
    return currentPlayer.value === playerSymbol.value
      ? "Your turn"
      : "🤖 AI is thinking...";
  return `Player ${currentPlayer.value === playerSymbol.value ? "1" : "2"}'s turn`;
});

// [FITUR 1] Helper: apakah giliran simbol ini aktif saat ini
const isActiveTurn = (symbol: Player): boolean => {
  if (winner.value || isDraw.value) return false;
  return currentPlayer.value === symbol;
};

// Label simbol di scoreboard (X atau O sesuai pilihan player)
const symbolLabel = (side: "X" | "O"): string => {
  // side 'X' = kolom kiri (player), 'O' = kolom kanan (opponent/AI)
  return side === "X" ? playerSymbol.value : opponentSymbol.value;
};

const isDisabled = (i: number) =>
  !!board.value[i] ||
  !!winner.value ||
  isDraw.value ||
  (gameMode.value === "pve" && currentPlayer.value === opponentSymbol.value) ||
  isAIProcessing.value;

// ============================================================
// Sound Effects
// ============================================================
const playSound = (type: "click" | "win" | "draw") => {
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
      osc.frequency.value = 600;
      gain.gain.value = 0.1;
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === "win") {
      osc.frequency.value = 800;
      gain.gain.value = 0.15;
      osc.start();
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.2);
      osc.stop(ctx.currentTime + 0.3);
    } else {
      osc.frequency.value = 400;
      gain.gain.value = 0.1;
      osc.start();
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.2);
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch (_) {
    /* silent fail */
  }
};

// ============================================================
// Game Logic Helpers
// ============================================================
const getAvailableMoves = (b: Board): number[] =>
  b.map((cell, i) => (cell === "" ? i : -1)).filter((i) => i !== -1);

const checkBoardWinner = (
  b: Board,
): { winner: Player; combo: number[] } | null => {
  for (const combo of WINNING_COMBOS) {
    const [a, c1, c2] = combo;
    if (b[a] && b[a] === b[c1] && b[a] === b[c2])
      return { winner: b[a] as Player, combo: [...combo] };
  }
  return null;
};

// ============================================================
// AI Logic
// ============================================================
const minimax = (
  b: Board,
  depth: number,
  isMaximizing: boolean,
  alpha: number,
  beta: number,
): number => {
  const result = checkBoardWinner(b);
  // AI selalu pakai opponentSymbol (bisa X atau O tergantung pilihan player)
  if (result?.winner === opponentSymbol.value) return 10 - depth;
  if (result?.winner === playerSymbol.value) return depth - 10;
  if (b.every(Boolean)) return 0;

  const moves = getAvailableMoves(b);
  if (isMaximizing) {
    let best = -Infinity;
    for (const move of moves) {
      b[move] = opponentSymbol.value;
      best = Math.max(best, minimax(b, depth + 1, false, alpha, beta));
      b[move] = "";
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = Infinity;
    for (const move of moves) {
      b[move] = playerSymbol.value;
      best = Math.min(best, minimax(b, depth + 1, true, alpha, beta));
      b[move] = "";
      beta = Math.min(beta, best);
      if (beta <= alpha) break;
    }
    return best;
  }
};

const findImmediateMove = (b: Board, player: Player): number | null => {
  for (const move of getAvailableMoves(b)) {
    b[move] = player;
    const won = checkBoardWinner(b);
    b[move] = "";
    if (won?.winner === player) return move;
  }
  return null;
};

const getAIMove = (b: Board, level: AiLevel): number => {
  const moves = getAvailableMoves(b);
  if (moves.length === 0) return -1;

  if (level === "easy") return moves[Math.floor(Math.random() * moves.length)];

  if (level === "hard") {
    let bestScore = -Infinity;
    let bestMove = moves[0];
    for (const move of moves) {
      b[move] = opponentSymbol.value;
      const score = minimax(b, 0, false, -Infinity, Infinity);
      b[move] = "";
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    return bestMove;
  }

  // MEDIUM
  if (Math.random() < 0.3)
    return moves[Math.floor(Math.random() * moves.length)];
  const winMove = findImmediateMove(b, opponentSymbol.value);
  if (winMove !== null) return winMove;
  const blockMove = findImmediateMove(b, playerSymbol.value);
  if (blockMove !== null) return blockMove;
  if (b[4] === "") return 4;
  const corners = [0, 2, 6, 8].filter((i) => b[i] === "");
  if (corners.length > 0)
    return corners[Math.floor(Math.random() * corners.length)];
  return moves[Math.floor(Math.random() * moves.length)];
};

// ============================================================
// Core Game Actions
// ============================================================

// [FITUR 4] Trigger animasi pop pada cell tertentu
const triggerCellAnim = (index: number) => {
  cellAnimating.value = index;
  setTimeout(() => {
    cellAnimating.value = null;
  }, 300);
};

const resolveMove = (b: Board, player: Player) => {
  const result = checkBoardWinner(b);
  if (result) {
    winner.value = result.winner;
    winningCells.value = result.combo;
    scores.value[result.winner]++;
    playSound("win");
    triggerConfetti();
    return true;
  }
  if (b.every(Boolean)) {
    winner.value = "draw";
    scores.value.draw++;
    playSound("draw");
    return true;
  }
  return false;
};

const makeMove = (index: number) => {
  if (isDisabled(index)) return;

  const b = [...board.value];
  b[index] = currentPlayer.value;
  board.value = b;
  playSound("click");
  triggerCellAnim(index); // [FITUR 4]

  if (resolveMove(b, currentPlayer.value)) return;

  const next: Player = currentPlayer.value === "X" ? "O" : "X";
  currentPlayer.value = next;

  if (gameMode.value === "pve" && next === opponentSymbol.value) {
    scheduleAIMove();
  }
};

const scheduleAIMove = () => {
  if (isAIProcessing.value) return;
  isAIProcessing.value = true;

  setTimeout(
    () => {
      if (winner.value || board.value.every(Boolean)) {
        isAIProcessing.value = false;
        return;
      }

      const b = [...board.value];
      const move = getAIMove(b, aiLevel.value);
      if (move === -1) {
        isAIProcessing.value = false;
        return;
      }

      b[move] = opponentSymbol.value;
      board.value = b;
      playSound("click");
      triggerCellAnim(move); // [FITUR 4] — animasi AI move juga
      isAIProcessing.value = false;

      if (resolveMove(b, opponentSymbol.value)) return;
      currentPlayer.value = playerSymbol.value;
    },
    400 + Math.random() * 300,
  );
};

// ============================================================
// Confetti
// ============================================================
const triggerConfetti = () => {
  showConfetti.value = true;
  setTimeout(() => {
    showConfetti.value = false;
  }, 3500);
};

// ============================================================
// Game Control
// ============================================================
const selectMode = (mode: GameMode) => {
  selectedMode.value = mode;
  if (mode === "pvp") aiLevel.value = "easy";
};

const startGame = () => {
  if (!selectedMode.value) return;
  if (selectedMode.value === "pve" && !aiLevel.value) return;
  gameMode.value = selectedMode.value;
  gameStarted.value = true;
  resetGame();
};

const resetGame = () => {
  board.value = Array(9).fill("");
  // [FITUR 3] Selalu mulai dari playerSymbol (bisa X atau O)
  currentPlayer.value = playerSymbol.value;
  winner.value = null;
  winningCells.value = [];
  showConfetti.value = false;
  isAIProcessing.value = false;
  cellAnimating.value = null;

  // Jika player pilih O, AI jalan duluan
  if (gameMode.value === "pve" && playerSymbol.value === "O") {
    scheduleAIMove();
  }
};

const resetScores = () => {
  scores.value = { X: 0, O: 0, draw: 0 };
  resetGame();
};

const backToSelection = () => {
  isAIProcessing.value = false;
  gameStarted.value = false;
  selectedMode.value = null;
  resetGame();
};

// ============================================================
// Expose
// ============================================================
defineExpose({ resetGame, backToSelection });
</script>

<style scoped>
@keyframes confetti-fall {
  0% {
    transform: translateY(-10px) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

.animate-pulse-glow {
  animation: pulse-glow 0.8s ease-in-out infinite alternate;
}

@keyframes pulse-glow {
  0% {
    box-shadow: 0 0 10px rgba(168, 85, 247, 0.3);
  }
  100% {
    box-shadow: 0 0 30px rgba(168, 85, 247, 0.7);
  }
}

/* [FITUR 4] Animasi pop saat cell diisi */
.animate-cell-pop {
  animation: cell-pop 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes cell-pop {
  0% {
    transform: scale(0.6);
    opacity: 0.5;
  }
  60% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
