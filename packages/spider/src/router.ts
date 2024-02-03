import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: '/tasks', component: () => import('./views/TaskList.vue') },
    { path: '/tasks/new', component: () => import('./views/TaskItem.vue') },
    { path: '/tasks/:id', component: () => import('./views/TaskItem.vue') },
    { path: '/webs/:id', component: () => import('./views/TaskWeb.vue') },
    { path: '/export_logs', component: () => import('./views/TaskExportLogs.vue') },
]


const router = createRouter({
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
})

export default router;