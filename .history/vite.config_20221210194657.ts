import { defineConfig } from 'vite'
import path from "path"
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default defineConfig({
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    },
  },
    
  base: '/dist/',
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: [
        'vue',
        'vue-router',
      ]
    }),
    Components({
      resolvers: [
        ElementPlusResolver(
        )
      ]
    })
  ],



})
