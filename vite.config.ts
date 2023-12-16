import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // 让手机可以 ip 访问
    port: 5173,
    open: true, // 自动打开浏览器
    cors: true, // 打开跨域
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve('./src'),
      },
    ],
  },
})
