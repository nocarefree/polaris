import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia as any);
app.use(router);
app.mount("#app");
