import { withInstall } from "../../utils";
import AppProvider from "./AppProvider.vue";

export const NpAppProvider = withInstall(AppProvider);

export default NpAppProvider;

export * from "./AppProvider";
