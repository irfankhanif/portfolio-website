import { ref, watch, onMounted } from 'vue'

export const useTheme = () => {
  const theme = ref<'dark' | 'light'>('dark')

  const applyTheme = (mode: 'dark' | 'light') => {
    if (import.meta.client) {
      document.documentElement.classList.toggle('light', mode === 'light')
      document.documentElement.style.colorScheme = mode
      localStorage.setItem('irfankhnf-theme', mode)
    }
  }

  const toggleTheme = () => {
    const newTheme = theme.value === 'dark' ? 'light' : 'dark'
    theme.value = newTheme
    applyTheme(newTheme)
  }

  // Load dari localStorage saat mount
  onMounted(() => {
    if (import.meta.client) {
      const saved = localStorage.getItem('irfankhnf-theme') as 'dark' | 'light' | null
      if (saved) {
        theme.value = saved
        applyTheme(saved)
      } else {
        // Default dark
        applyTheme('dark')
      }
    }
  })

  // Watch perubahan
  watch(theme, (val) => {
    applyTheme(val)
  })

  return {
    theme,
    toggleTheme,
  }
}