import { defineAsyncComponent } from 'vue'

const routes = [
  {
    path: '/',
    children: [
      {
        path: '',
        name: 'auth',
        component: () => import('@/pages/auth'),
      },
      {
        path: '/services',
        name: 'services',
        component: defineAsyncComponent(() => import('@/pages/service')),
        meta: { requiresAuth: true },
      },
      {
        path: '/applications',
        name: 'applications',
        component: defineAsyncComponent(() => import('@/pages/application')),
        meta: { requiresAuth: true },
      },
    ],
  },
]

export default routes
