// composables/useReveal.ts
import { ref, watch, onUnmounted, type Ref } from "vue";

interface UseRevealOptions {
  threshold?: number | number[];
  rootMargin?: string;
  once?: boolean;
}

export const useReveal = (
  target: Ref<HTMLElement | null>,
  options: UseRevealOptions = {}
) => {
  const { threshold = 0.15, rootMargin = "0px", once = true } = options;
  const visible = ref(false);

  let observer: IntersectionObserver | null = null;

  const cleanup = () => {
    observer?.disconnect();
    observer = null;
  };

  const setupObserver = (el: HTMLElement) => {
    cleanup();
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          visible.value = true;
          if (once) cleanup();
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
  };

  watch(
    () => target.value,
    (newEl) => {
      if (newEl) {
        setupObserver(newEl);
      } else {
        cleanup();
      }
    },
    { immediate: true, flush: "post" }
  );

  onUnmounted(cleanup);

  return { visible };
};