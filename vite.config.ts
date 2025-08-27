import path from 'path'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const APP_URL = env.VITE_APP_URL

  return {
    plugins: [
      vue(),
      vueDevTools(),
      Components({ resolvers: [IconsResolver()] }),
      Icons({ autoInstall: true }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "@/app/styles/varibles.scss" as *;
          @use "@/app/styles/app.scss" as *;
        `,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      proxy: {
        '/auth': {
          target: `${APP_URL}/auth/`,
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) => path.replace(/^\/auth/, '/auth'),
        },
        '/dashboard': {
          target: `${APP_URL}/dashboard/`,
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) => path.replace(/^\/dashboard/, '/dashboard'),
        },
        '/pixverse': {
          target: `${APP_URL}/pixverse/`,
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) => path.replace(/^\/pixverse/, '/pixverse'),
        },
      },
    },
  }
})
