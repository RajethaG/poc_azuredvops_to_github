import * as types from '@/services/api/api-types.js'

export default [
  {
    path: '/integration/voa',
    name: types.INTEGRATION_VOA,
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(
        /* webpackChunkName: "landing" */ '@/components/pages/landing-voa.vue'
      )
  },
  {
    path: '/integration/:product/summary/:orderId',
    name: types.SUMMARY_REQUEST_INTERNAL,
    meta: {
      requiresAuth: false
    },
    exact: true,
    component: () =>
      import(
        /* webpackChunkName: "landing" */ '@/components/pages/summary-main.vue'
      )
  },
  {
    path: '/integration/:product/summary',
    name: types.SUMMARY_REQUEST,
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(
        /* webpackChunkName: "landing" */ '@/components/pages/summary-main.vue'
      )
  }
]
