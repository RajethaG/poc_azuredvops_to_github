export default [
  {
    path: '/landing',
    name: 'landing',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "landing" */ '@/components/pages/landing.vue')
  }
]
