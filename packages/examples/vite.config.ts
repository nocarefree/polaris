import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import postCssPxToRem from "postcss-pxtorem";
import _ from "lodash";

export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [
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
              prev.push("-");
            } else {
              cur = _.upperFirst(_.camelCase(cur));
              if (prev.length === 0 || prev[prev.length - 1] !== cur) {
                prev.push(cur);
              }
            }
            return prev;
          }, []);

        if (names[names.length - 1] != name) {
          names.push(
            name.charAt(0) === name.charAt(0).toUpperCase() ? "__" : "--"
          );
          names.push(name);
        }

        return "Polaris" + names.join("");
      },
    },
  },
  resolve: {
    alias: {
      "@ncpl-polaris": resolve(__dirname, "../ncpl-polaris/src"),
    },
  },
});
