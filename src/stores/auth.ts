import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || ''
  }),
  getters: {
    isAuthenticated: (state) => !!state.accessToken
  },
  actions: {
    async login(username: string, password: string) {
      const res = await axios.post('/auth/api/v1/token', { username, password })
      this.accessToken = res.data.access_token
      this.refreshToken = res.data.refresh_token
      localStorage.setItem('accessToken', this.accessToken)
      localStorage.setItem('refreshToken', this.refreshToken)
    },
    logout() {
      this.accessToken = ''
      this.refreshToken = ''
      localStorage.clear()
    },
    async refresh() {
      try {
        const res = await axios.post('/auth/api/v1/refresh',
          { refresh_token: this.refreshToken }
        )
        this.accessToken = res.data.access_token
        localStorage.setItem('accessToken', this.accessToken)
        return true // Успешное обновление
      } catch (error) {
        console.error('Refresh token failed:', error)
        this.logout() // Очищаем хранилище при неудаче
        return false
      }
    }
  }
})
