import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const APP_URL: string = env.VITE_APP_URL
  const PROXY_PATHS: string[] = JSON.parse(env.VITE_API_PATHS)

  const proxyConfig = Object.fromEntries(
    PROXY_PATHS.map((p) => [
      `/${p}`,
      {
        target: `${APP_URL}/${p}/`,
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(new RegExp(`^/${p}`), `/${p}`),
      },
    ]),
  )

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
      proxy: proxyConfig,
      // host: true,
      // port: 5173,
      // strictPort: false,
    },
  }
})
