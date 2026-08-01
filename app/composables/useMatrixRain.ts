import { onUnmounted, type Ref } from "vue";
import { useTheme } from "~/composables/useTheme";

interface MatrixOptions {
  fontSize?: number;
  colorDark?: string;   
  colorLight?: string; 
  speed?: number;
  trail?: boolean;    
}

export const useMatrixRain = (
  canvasRef: Ref<HTMLCanvasElement | null>,
  options: MatrixOptions = {}
) => {
  // Konfigurasi
  const {
    fontSize = 14,
    colorDark = "#00ffff",   
    colorLight = "#7c3aed",  
    speed = 0.5,
    trail = false,
  } = options;

  const { theme } = useTheme(); 

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  // State
  let animationId: number | null = null;
  let drops: number[] = [];
  let ctx: CanvasRenderingContext2D | null = null;
  let isRunning = false;
  let canvasWidth = 0;
  let canvasHeight = 0;

  // Init
  const init = () => {
    if (!import.meta.client) return;
    const canvas = canvasRef.value;
    if (!canvas || !ctx) return;

    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const cols = Math.ceil(canvasWidth / fontSize);
    drops = Array.from({ length: cols }, () =>
      Math.floor(Math.random() * (canvasHeight / fontSize))
    );
  };

  // Draw
  const draw = () => {
    if (!import.meta.client || !isRunning) return;
    const canvas = canvasRef.value;
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    if (trail) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    // Pilih warna berdasarkan tema
    const currentColor = theme.value === "dark" ? colorDark : colorLight;

    // Matrix characters dengan warna yang sesuai tema
    ctx.shadowColor = currentColor;
    ctx.shadowBlur = 15;
    ctx.fillStyle = currentColor;
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const yPos = y * fontSize;

      ctx!.fillText(char, x, yPos);

      if (yPos > canvasHeight && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i] += speed;
    });

    animationId = requestAnimationFrame(draw);
  };

  // Start / Stop
  const start = () => {
    if (!import.meta.client) {
      console.warn("Skipping matrix rain on server");
      return;
    }
    if (isRunning) return;

    const canvas = canvasRef.value;
    if (!canvas) {
      console.error("Canvas element not found!");
      return;
    }

    ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Cannot get canvas context!");
      return;
    }

    isRunning = true;
    init();
    window.addEventListener("resize", init);
    draw();
  };

  const stop = () => {
    if (!import.meta.client) return;
    isRunning = false;
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    window.removeEventListener("resize", init);
  };

  onUnmounted(() => {
    stop();
  });

  return { start, stop };
};