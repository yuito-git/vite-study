import { defineConfig } from "vite";
import path from "path";// https://nodejs.org/api/path.html
import globule from "globule"; // https://www.npmjs.com/package/globule
import vitePluginPugStatic from "@macropygia/vite-plugin-pug-static";

const inputs = {};
const documents = globule.find([`./src/**/*.html`, `./src/**/*.pug`], {
  ignore: [`./src/html/**/_*.html`, `./src/pug/**/_*.pug`],
});
documents.forEach((document) => {
  const fileName = document.replace(`./src/`, "");
  const key = path.parse(document).name;
  inputs[key] = path.resolve(__dirname, "src", fileName);
});

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    minify: false,
    rollupOptions: {
      input: { ...inputs },
      output: {
        entryFileNames: `assets/js/[name].js`,
        chunkFileNames: `assets/js/[name].js`,
        assetFileNames: (assetInfo) => {
          if (/\.( gif|jpeg|jpg|png|svg|webp| )$/.test(assetInfo.name)) {
            return `assets/images/[name].[ext]`;
          }
          if (/\.css$/.test(assetInfo.name)) {
            return `assets/css/[name].[ext]`;
          }
          return 'assets/[name].[ext]';
        }
      }
    }
  },
  plugins: [

    vitePluginPugStatic({
      buildOptions: { basedir: "src" },
      serveOptions: { basedir: "src" }
    })
  ]
})