import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import vueDevTools from 'vite-plugin-vue-devtools'


const host = process.env.TAURI_DEV_HOST;

export default defineConfig(async () => ({
  plugins: [vueDevTools(), vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('onyks-')
      }
    }
  })],
  base: '',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@bloodstone': fileURLToPath(new URL('../onyks-bloodstone/frontend/src', import.meta.url)),
    },
    dedupe: ['vue', 'vue-router', 'pinia', 'onyks-web-ui'],
  },
  clearScreen: false,
  server: {
    fs: { allow: ['..'] },
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? { protocol: "ws", host, port: 1421 }
      : undefined,
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
    devtools: {
    apply: 'serve',
  },
}));