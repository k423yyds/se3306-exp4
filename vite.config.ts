import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
// 本地 dev / preview 用根路径；部署到 GitHub Pages 时用仓库子路径（由 GH_PAGES 环境变量开启）
export default defineConfig({
  base: process.env.GH_PAGES ? '/se3306-exp4/' : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
