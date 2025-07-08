import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/auth': {
        target: 'https://trust.coreapis.space/auth/',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/auth/, '/auth'),
      },
      '/dashboard': {
        target: 'https://trust.coreapis.space/dashboard/',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/dashboard/, '/dashboard'),
      },
      '/chatgpt': {
        target: 'https://trust.coreapis.space/chatgpt/',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/chatgpt/, '/chatgpt'),
      },
      '/pixverse': {
        target: 'https://trust.coreapis.space/pixverse/',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/pixverse/, '/pixverse'),
      },
    },
  }
})
