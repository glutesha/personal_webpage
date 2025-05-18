import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: 'index.html',
        links: 'links/index.html'  
      } 
    }
  },
  plugins: [
    tailwindcss(),
  ],
})