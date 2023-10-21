import { createRouter, createWebHashHistory } from "vue-router"

import Home from "./pages/Home.vue"
import Templates from "./pages/templates/Templates.vue"
import TemplateDetails from "./pages/templates/TemplateDetails.vue"
import Sites from "./pages/sites/Sites.vue"
import SiteDetails from "./pages/sites/SiteDetails.vue"
import Tabs from "./pages/Tabs.vue"


const routes = [
    { path: '/', component: Home },
    { path: '/templates', component: Templates },
    { path: '/templates/new', component: TemplateDetails },

    { path: '/sites', component: Sites },
    { path: '/sites/new', component: SiteDetails },

    { path: '/tabs', component: Tabs },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

export default router;