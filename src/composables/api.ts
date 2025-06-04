import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
  baseURL: '/auth/v1',
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use((config) => {
  const auth = useAuthStore()
  if (auth.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const auth = useAuthStore()
    if (err.response.status === 401 && auth.refreshToken) {
      await auth.refresh()
      err.config.headers.Authorization = `Bearer ${auth.accessToken}`
      return axios(err.config)
    }
    return Promise.reject(err)
  }
)

export default api
