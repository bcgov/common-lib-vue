import { fileURLToPath } from 'node:url'
import path from 'path'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/library.js'),
      name: 'common-lib-vue',
      // the proper extensions will be added
      fileName: 'common-lib-vue'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == 'style.css') return 'common-lib-vue.css'
          return assetInfo.name
        }
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
    target: 'esnext'
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
