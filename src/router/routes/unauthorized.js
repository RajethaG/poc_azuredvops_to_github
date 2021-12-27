export default [
  {
    path: '/authError',
    name: 'authError',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(
        /* webpackChunkName: "unauthorized" */ '@/components/pages/unauthorized.vue'
      )
  }
]
