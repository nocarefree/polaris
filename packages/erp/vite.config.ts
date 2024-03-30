import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import postCssPxToRem from "postcss-pxtorem";
import postcssCustomMedia from "postcss-custom-media";
import postcssGlobalData from "@csstools/postcss-global-data";

const mediaQueriesCssPath = resolve(__dirname, '../../node_modules/@shopify/polaris-tokens/dist/css/media-queries.css');

export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [
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
  },
  resolve: {
    alias: {
      "src": resolve(__dirname, "./src"),
    },
  },
  server: {
    //用来配置跨域
    host: '127.0.0.1',
    proxy: {
      '/frontendapi': {
        target: 'http://spider.com/',//目标服务器地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/graphql': {
        target: 'http://spider.com/',//目标服务器地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }
});
