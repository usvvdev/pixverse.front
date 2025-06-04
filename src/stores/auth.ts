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
      const res = await axios.post('/auth/api/v1/refresh', {}, {
        headers: { Authorization: `Bearer ${this.refreshToken}` }
      })
      this.accessToken = res.data.access_token
      localStorage.setItem('accessToken', this.accessToken)
    }
  }
})
