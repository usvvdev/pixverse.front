import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import uiPro from '@nuxt/ui-pro/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    uiPro({
      ui: {
        colors: {
          primary: 'green',
          neutral: 'zinc'
        }
      }
    })
  ],
  server: {
    proxy: {
      // '/auth': {
      //   target: 'http://144.172.103.225',
      //   changeOrigin: true,
      //   secure: false,
      //   rewrite: (path) => path.replace(/^\/auth/, '/auth/api'),
      // },
      '/dashboard': {
        // target: 'http://144.172.103.225',
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/dashboard/, '/dashboard/api'),
      }
    },
  },
})
