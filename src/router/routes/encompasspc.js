import * as types from '@/services/api/api-types.js'

export default [
  {
    path: '/encompasspc',
    name: types.ENCOMPASS_PC,
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(
        /* webpackChunkName: "encompasspc" */ '@/components/pages/encompasspc/login.vue'
      )
  },
  {
    path: '/encompasspc/:product',
    name: types.ENCOMPASS_PC_FORM,
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(
        /* webpackChunkName: "encompasspc" */ '@/components/pages/encompasspc/voe.vue'
      )
  },
  {
    path: '/encompasspc/:product/summary/:orderId',
    name: types.ENCOMPASS_PC_SUMMARY,
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(
        /* webpackChunkName: "encompasspc" */ '@/components/pages/encompasspc/voe-summary.vue'
      )
  }
]
