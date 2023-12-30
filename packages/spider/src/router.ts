import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: '/tasks', component: () => import('./views/TaskList.vue') },
    { path: '/tasks/new', component: () => import('./views/TaskForm.vue') },
]


const router = createRouter({
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
})

export default router;