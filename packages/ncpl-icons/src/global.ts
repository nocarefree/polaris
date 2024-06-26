import { type App } from "vue";
import * as icons from "./components";

export interface InstallOptions {
  /** @default `ElIcon` */
  prefix?: string;
}
export default (app: App, { prefix = "Np" }: InstallOptions = {}) => {
  for (const [key, component] of Object.entries(icons)) {
    app.component(prefix + key, component);
  }
};

export { icons };
export * from "./components";
