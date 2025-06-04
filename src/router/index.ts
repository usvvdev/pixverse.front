import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Авторизация',
      component: () => import('../components/layout/LoginLayout.vue'),
      meta: {
        title: 'Авторизация',
      },
    },
    {
      path: '/styles',
      name: 'Стили',
      component: () => import('../views/Tables/StyleTable.vue'),
      meta: {
        title: 'Стили',
      },
    },

    {
      path: '/templates',
      name: 'Шаблоны',
      component: () => import('../views/Tables/TemplateTable.vue'),
      meta: {
        title: 'Шаблоны',
      },
    },

    {
      path: '/accounts',
      name: 'Аккаунты',
      component: () => import('../views/Tables/AccountTable.vue'),
      meta: {
        title: 'Аккаунты',
      },
    },

  ],
})

export default router

router.beforeEach((to, from, next) => {
  document.title = `Pixverse | ${to.meta.title}`
  next()
})
