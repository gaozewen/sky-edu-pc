import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig, splitVendorChunkPlugin } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // 让手机可以 ip 访问
    port: 5173,
    open: true, // 自动打开浏览器
    cors: true, // 打开跨域
  },
  plugins: [react(), splitVendorChunkPlugin()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve('./src'),
      },
    ],
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: '[name]-[hash].js', // 入口文件名格式
        chunkFileNames: '[name]-[hash].js', // chunk 文件名格式
      },
    },
  },
})
