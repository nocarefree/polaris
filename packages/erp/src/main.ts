import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "@ncpl/ncpl-polaris/dist/style.css"

const app = createApp(App);
const pinia = createPinia();
app.use(pinia as any);
app.use(router);
app.mount("#app");
