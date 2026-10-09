import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { loadEnv } from 'vite'

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: loadEnv('production', '.', 'PREVIEW_').PREVIEW_ALLOWED_HOST
      ? [loadEnv('production', '.', 'PREVIEW_').PREVIEW_ALLOWED_HOST]
      : [],
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/main.tsx', 'src/vite-env.d.ts', 'src/test/**'],
    },
  },
})
