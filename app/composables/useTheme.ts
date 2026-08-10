import { ref, watch, onMounted } from 'vue'

export const useTheme = () => {
  const theme = ref<'dark' | 'light'>('dark')

  const applyTheme = (mode: 'dark' | 'light') => {
    if (!import.meta.client) return
    document.documentElement.classList.toggle('light', mode === 'light')
    document.documentElement.style.colorScheme = mode
    localStorage.setItem('irfankhnf-theme', mode)
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  onMounted(() => {
    const saved = localStorage.getItem('irfankhnf-theme') as 'dark' | 'light' | null
    const systemPref = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    theme.value = saved ?? systemPref
    applyTheme(theme.value)
  })

  watch(theme, (val) => {
    applyTheme(val)
  })

  return { theme, toggleTheme }
}