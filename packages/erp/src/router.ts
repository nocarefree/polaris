import { createRouter, createWebHistory } from "vue-router";
const routes = [
    { path: '/', component: () => import("./components/HomePage") },
    { path: '/orders', component: () => import('./components/OrdersPage') },
    { path: '/products', component: () => import('./components/Products.vue') },
    { path: '/settings', component: () => import('./components/Settings.vue') },
]


const router = createRouter({
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
})

export default router;