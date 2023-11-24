/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // 更多环境变量...
  readonly VITE_CDN_HOST: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
