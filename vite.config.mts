import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    tailwindcss(),
    ViteImageOptimizer({
      png: {
        quality: 60
      }
    }),
  ],
})