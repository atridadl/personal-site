import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mdPlugin from 'vite-plugin-markdown';

export default defineConfig({
  build: {
    outDir: "../spaDist"
  },
  plugins: [
    vue(),
    mdPlugin()
  ]
})
