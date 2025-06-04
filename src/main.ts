import './assets/main.css'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'jsvectormap/dist/jsvectormap.css'
import 'flatpickr/dist/flatpickr.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { useAuthStore } from './stores/auth'
import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()

app.use(router)

app.use(pinia)

app.mount('#app')

router.beforeEach((to, _, next) => {
  const auth = useAuthStore()

  const publicPages = ['Авторизация']
  const authRequired = !publicPages.includes(to.name as string)

  if (authRequired && !auth.isAuthenticated) {
    return next('/')
  }

  next()
})

