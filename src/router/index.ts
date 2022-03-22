import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { AppRouteRecordRaw } from './types'
import { beforEachFunc } from './routerEach'

import Layout from '@/components/Layout/index.vue'
// 引入子路由
// import RouterViewTpl from '@/components/routerViewTpl.vue'

// name值是path路径分割'__'
const initRoutes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [
      // {
      //   path: 'test',
      //   name: 'test',
      //   meta: {
      //     title: '测试'
      //   },
      //   component: RouterViewTpl,
      //   children: [
      //     {
      //       path: 'list',
      //       name: 'test__list',
      //       meta: {
      //         title: '测试列表'
      //       },
      //       component: () => import('@/views/modules/test/list/index.vue')
      //     }
      //   ]
      // },
      {
        path: '',
        name: 'index',
        meta: {
          title: '首页'
        },
        component: () => import('@/views/modules/index/index.vue')
      },
      {
        path: 'login',
        name: 'login',
        meta: {
          title: '登录'
        },
        component: () => import('@/views/login/index.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('@/views/404/index.vue')
  }
]
// console.log(initRoutes)

const router = createRouter({
  history: createWebHashHistory(),
  routes: initRoutes as RouteRecordRaw[]
})

router.beforeEach(beforEachFunc)

export default router
