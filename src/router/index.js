// 管理员及普通用户分流待实现
import Vue from 'vue'
import Router from 'vue-router'
// import * as path from "path";

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: () => import('../components/Home.vue'),
            meta: {title: 'home'},
            children: [
                {
                    path: 'dashboard',
                    component: () => import('../views/dashboard'),
                    meta: {title: '系统首页'}
                },
                {
                    path: 'table1',
                    component: () => import('../views/table1.vue'),
                    meta: {title: '用户表格'}
                },
                {
                    path: 'table2',
                    component: () => import('../views/table2.vue'),
                    meta: {title: '小区表格'}
                },
                {
                    path: 'table3',
                    component: () => import('../views/table3.vue'),
                    meta: {title: '反馈表格'}
                },
                {
                    path: 'form',
                    component: () => import('../views/form'),
                    meta: {title: '复杂表单'}
                },
                {
                    path: 'form-detail',
                    component: () => import('../views/form-detail'),
                    meta: {title: '表单详情'}
                },
                {
                    path: 'mapview',
                    component: () => import('../views/map'),
                    meta: {title: '地图展示'}
                },
                {
                    path: 'upload',
                    component: () => import('../views/upload'),
                    meta: {title: '文件上传'}
                },
                {
                    path: 'charts',
                    component: () => import('../views/charts'),
                    meta: {title: 'vchart图表'}
                }
            ]
        },
        {
            path: '/login',
            component: () => import('../views/newLogin'),
            meta: {title: '登录'}
        },
        {
            path: '/error',
            component: () => import('../views/errorPage'),
            meta: {title: '错误'}
        },

    ]
})