import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
// https://cn.vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      // dev 独有配置
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
    }
  } else {
    return {
      // build 独有配置
      plugins: [
        react(),
        // 传统浏览器可以通过插件 @vitejs/plugin-legacy 来支持，
        // 它将自动生成传统版本的 chunk 及与其相对应 ES 语言特性方面的 polyfill。
        // 兼容版的 chunk 只会在不支持原生 ESM 的浏览器中进行按需加载。
        legacy({
          targets: ['defaults'],
        }),
      ],
      resolve: {
        alias: [
          {
            find: '@',
            replacement: path.resolve('./src'),
          },
        ],
      },
      build: {
        sourcemap: true,
        rollupOptions: {
          // 由于使用了 importToCDN ，所以不需要再写
          // 确保外部化处理那些你不想打包进库的依赖
          // external: [],
          output: {
            // 由于使用了 importToCDN ，所以不需要再写
            // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
            // globals: {
            //   react: 'React',
            //   'react-dom': 'ReactDom',
            //   'react-router-dom': 'ReactRouterDom',
            // },
            chunkFileNames: 'static/js/[name]-[hash].js',
            entryFileNames: 'static/js/[name]-[hash].js',
            assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          },
        },
      },
    }
  }
})
