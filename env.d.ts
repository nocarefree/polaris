/// <reference types="vite/client" />

declare module "*.module.scss";

declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
