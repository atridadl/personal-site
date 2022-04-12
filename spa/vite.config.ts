import { defineConfig } from 'vite'
import plugin, { Mode } from 'vite-plugin-markdown'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
    plugin({ mode: [Mode.HTML, Mode.TOC, Mode.VUE] }),
  ]
})
