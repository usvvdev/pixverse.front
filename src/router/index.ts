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
      path: '/main',
      name: 'Главная',
      component: () => import('../views/Pages/MainPage.vue'),
      meta: {
        title: 'Главная',
      },
    },
    {
      path: '/pix',
      name: 'Pixverse API',
      redirect: '/pixverse/accounts',
      meta: {
        title: 'Pixverse',
      },
      children: [
        {
          path: 'styles',
          name: 'Стили Pixverse',
          component: () => import('../views/Tables/pixverse/StyleTable.vue'),
          meta: {
            title: 'Стили Pixverse',
          },
        },
        {
          path: 'templates',
          name: 'Шаблоны Pixverse',
          component: () => import('../views/Tables/pixverse/TemplateTable.vue'),
          meta: {
            title: 'Шаблоны Pixverse',
          },
        },
        {
          path: 'accounts',
          name: 'Аккаунты Pixverse',
          component: () => import('../views/Tables/pixverse/AccountTable.vue'),
          meta: {
            title: 'Аккаунты Pixverse',
          },
        },
        {
          path: 'applications',
          name: 'Приложения Pixverse',
          component: () => import('../views/Tables/pixverse/ApplicationTable.vue'),
          meta: {
            title: 'Приложения Pixverse',
          },
        },
      ]
    },
    {
      path: '/photogenerator',
      name: 'Photo Generator API',
      redirect: '/photogenerator/templates',
      meta: {
        title: 'Photo Genrator',
      },
      children: [
        {
          path: 'templates',
          name: 'Шаблоны Photo Genrator',
          component: () => import('../views/Tables/photogenerator/TemplateTable.vue'),
          meta: {
            title: 'Шаблоны Photo Genrator',
          },
        },
        {
          path: 'applications',
          name: 'Приложения Photo Genrator',
          component: () => import('../views/Tables/photogenerator/ApplicationTable.vue'),
          meta: {
            title: 'Приложения Photo Genrator',
          },
        },
      ]
    }
  ],
})

export default router

router.beforeEach((to, from, next) => {
  document.title = `Pixverse | ${to.meta.title}`
  next()
})
