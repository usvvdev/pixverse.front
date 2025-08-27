import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import useAuthStore from '../stores'

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'auth' }
  }

  if (to.name === 'auth' && authStore.isAuthenticated) {
    return { name: 'services' }
  }
})

export default router
