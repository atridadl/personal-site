import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  build: {
    outDir: "../spaDist"
  },
  plugins: [
    vue(),
  ]
})
