import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    // {
    //   path: '/',
    //   name: 'Ecommerce',
    //   component: () => import('../views/Ecommerce.vue'),
    //   meta: {
    //     title: 'eCommerce Dashboard',
    //   },
    // },
    // {
    //   path: '/profile',
    //   name: 'Profile',
    //   component: () => import('../views/Others/UserProfile.vue'),
    //   meta: {
    //     title: 'Profile',
    //   },
    // },
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

    {
      path: '/signin',
      name: 'Signin',
      component: () => import('../views/Auth/Signin.vue'),
      meta: {
        title: 'Signin',
      },
    },
  ],
})

export default router

router.beforeEach((to, from, next) => {
  document.title = `Vue.js ${to.meta.title} | TailAdmin - Vue.js Tailwind CSS Dashboard Template`
  next()
})
