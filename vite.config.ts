import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/max-web-chat/',
  plugins: [react()],
  resolve: {
    alias: {
      '@app': path.resolve(import.meta.dirname, './src/app'),
      '@shared': path.resolve(import.meta.dirname, './src/shared'),
      '@pages': path.resolve(import.meta.dirname, './src/pages'),
      '@widgets': path.resolve(import.meta.dirname, './src/widgets'),
      '@features': path.resolve(import.meta.dirname, './src/features'),
      '@entities': path.resolve(import.meta.dirname, './src/entities'),
    },
  },
})
