import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const STORAGE_KEY = 'theme-preference'

function getSystemTheme() {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(isDark) {
  if (typeof document === 'undefined') return
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

export const useThemeStore = defineStore('theme', () => {
  const preference = ref('system')

  const resolvedTheme = computed(() => {
    if (preference.value === 'dark') return 'dark'
    if (preference.value === 'light') return 'light'
    return getSystemTheme()
  })

  const isDark = computed(() => resolvedTheme.value === 'dark')

  function setTheme(value) {
    const next = value === 'light' || value === 'dark' || value === 'system' ? value : 'system'
    preference.value = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch (_) {}
    applyTheme(next === 'dark' || (next === 'system' && getSystemTheme() === 'dark'))
  }

  function toggleTheme() {
    const next = isDark.value ? 'light' : 'dark'
    setTheme(next)
  }

  function init() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        preference.value = stored
      }
    } catch (_) {}
    applyTheme(resolvedTheme.value === 'dark')

    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-color-scheme: dark)')
      media.addEventListener('change', () => {
        if (preference.value === 'system') {
          applyTheme(getSystemTheme() === 'dark')
        }
      })
    }
  }

  return {
    preference,
    resolvedTheme,
    isDark,
    setTheme,
    toggleTheme,
    init,
  }
})
