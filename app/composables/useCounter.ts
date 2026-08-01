// composables/useCounter.ts
import { ref, watch, onMounted } from 'vue'

export const useCounter = (target: Ref<HTMLElement | null>, end: number, duration = 1500) => {
  const count = ref(0)
  let startTime: number | null = null
  let animationId: number | null = null

  const animate = (timestamp: number) => {
    if (!startTime) startTime = timestamp
    const progress = Math.min((timestamp - startTime) / duration, 1)
    count.value = Math.floor(progress * end)
    if (progress < 1) {
      animationId = requestAnimationFrame(animate)
    }
  }

  const startCounter = () => {
    if (animationId) cancelAnimationFrame(animationId)
    startTime = null
    count.value = 0
    animationId = requestAnimationFrame(animate)
  }

  // Observer untuk trigger saat visible
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!target.value) return
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCounter()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(target.value)
  })

  return { count }
}