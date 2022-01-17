export default [
  {
    path: '/error',
    name: 'error',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "error" */ '@/components/pages/error.vue')
  }
]
