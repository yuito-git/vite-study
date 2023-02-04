import { defineConfig } from "vite";
import vitePluginPugStatic from '@macropygia/vite-plugin-pug-static'
export default defineConfig({
  root: "src",
  optimizeDeps: {
    entries: "src"
  },

  build: {
    rollupOptions: {
      input: "src/index.pug"
    }
  },
  plugins: [
    vitePluginPugStatic({
      buildOptions: {
        basedir: "src"
      },
      serveOptions: {
        basedir: "src"
      }
    })
  ]
})