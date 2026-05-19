import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path' // 1. 必须引入 path 模块

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  // 2. 添加别名配置，解决 @ 符号报错问题
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // 如果你后端改了 8008 记得同步改这里
        changeOrigin: true,
        // 3. 将 /api 替换为空，这样前端请求 /api/login，后端实际收到的是 /login
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})