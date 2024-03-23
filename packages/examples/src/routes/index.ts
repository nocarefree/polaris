import { createRouter, createWebHistory } from "vue-router"
import { ComponentsRoutes } from "./components"

import Home from "../pages/Home.vue";


const routes = [
    { path: '/', component: Home },
    ...ComponentsRoutes
];

const router = createRouter({
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
})

export default router;