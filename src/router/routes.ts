import { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/editor',
    name: 'editor',
    component: () => import(/* webpackChunkName: "editor" */ '../views/editor/index.vue'),
    meta: {
      title: '可视化编辑器',
    },
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/editor',
  },
]
