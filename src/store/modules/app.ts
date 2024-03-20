import { defineStore } from 'pinia'
import { APP_THEME_ALGO_KEY, APP_COMPACT_MODE_KEY } from '@/enums/cacheEnum'
import { webStorage } from '@/utils'

export const useAppStore = defineStore('app', {
  state: (): AppState => {
    return {
      theme: webStorage.ls.get(APP_THEME_ALGO_KEY) || 'dark',
      compact: webStorage.ls.get(APP_COMPACT_MODE_KEY) || false,
    }
  },
  actions: {
    changeTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      webStorage.ls.set(APP_THEME_ALGO_KEY, this.theme)
    },
    changeCompactMode() {
      this.compact = !this.compact
      webStorage.ls.set(APP_COMPACT_MODE_KEY, this.compact)
    },
  },
})
