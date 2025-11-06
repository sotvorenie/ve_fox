import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Main',
        component: () => import('../pages/MainPage.vue')
    }
]