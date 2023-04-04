import { defineConfig } from 'vite'
// import Inspect from 'vite-plugin-inspect'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'unplugin-vue-setup-extend-plus/vite'
// import Unplugin from '../src/vite'
import type { Plugin } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    // Inspect(),
    // Unplugin({}),
    vueSetupExtend({
      enableAutoExpose: true,
    }) as unknown as Plugin,
  ],
})
