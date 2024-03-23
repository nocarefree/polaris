/// <reference types="vite/client" />

declare module '@ncpl-polaris';

declare module "*.module.scss";

declare module "*.vue" {
    import { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
