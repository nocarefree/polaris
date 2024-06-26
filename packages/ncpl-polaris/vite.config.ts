import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import postCssPxToRem from "postcss-pxtorem";
import postcssCustomMedia from "postcss-custom-media";
import postcssImport from "postcss-import";
import postcssGlobalData from "@csstools/postcss-global-data";
import postcssMixins from "postcss-mixins";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import dts from "vite-plugin-dts"

const mediaQueriesCssPath = resolve(__dirname, '../../node_modules/@shopify/polaris-tokens/dist/css/media-queries.css');

export default defineConfig({
  base: './',
  build: {
    //target: "esnext",
    //打包文件目录
    outDir: "dist",
    //压缩
    //minify: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: "src/index.ts",
      name: 'polaris',
      formats: ["es", "cjs", "umd"],
      fileName: format => `polaris.${format}.js`
    },
    rollupOptions: {
      //忽略打包vue文件
      external: ["vue"],
      input: ["src/index.ts"],
      output: {
        exports: "named",
        globals: {
          vue: 'Vue',
        }
      }
    }
  },
  plugins: [vue(), dts({
    insertTypesEntry: true,
  })],
  css: {
    postcss: {
      plugins: [
        postcssImport(),
        postcssMixins({
          mixinsDir: resolve(__dirname, './postcss-mixins'),
        }),
        postcssGlobalData({
          files: [mediaQueriesCssPath],
        }),
        postcssCustomMedia(),
        postCssPxToRem({
          rootValue: 16,
          propList: ["*"],
        }),
      ],
    },
    modules: {
      generateScopedName: (name: string, filename: string, css: string) => {
        let basepath = filename.slice(
          filename.indexOf("components"),
          filename.indexOf(".vue") > 0
            ? filename.indexOf(".vue")
            : filename.indexOf(".module.")
        );

        let names = basepath
          .replace("\\", "/")
          .split("/")
          .reduce(function (prev: string[], cur: string) {
            if (cur == "components") {
              //prev.push("-");
            } else {
              cur = "-" + upperFirst(camelCase(cur));
              if (prev.length === 0 || prev[prev.length - 1] !== cur) {
                prev.push(cur);
              }
            }
            return prev;
          }, []);

        if (names[names.length - 1] != ("-" + name)) {
          name = name.replace("-", "--");
          names.push(
            name.charAt(0) === name.charAt(0).toUpperCase() ? "__" : "--"
          );
          names.push(name);
        }

        return "Polaris" + names.join("");
      },
    },
  }
});
