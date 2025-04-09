import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        links: 'links/index.html'  
      }
    }
  },
  plugins: [
    tailwindcss(),
    ViteImageOptimizer({
      png: {
        quality: 60
      }
    }),
  ],
})