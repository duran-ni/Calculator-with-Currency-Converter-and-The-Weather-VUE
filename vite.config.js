import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/Calculator-with-Currency-Converter-and-The-Weather-VUE/',
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    exclude: ['**/node_modules/**', '**/dist/**', '**/.git/**', 'tests/e2e/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{js,vue}'],
      exclude: ['src/main.js']
    }
  }
})