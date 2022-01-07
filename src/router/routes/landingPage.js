export default [
  {
    path: '/landingPage',
    name: 'landingPage',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(
        // eslint-disable-next-line max-len
        /* webpackChunkName: "landing" */ '@/components/pages/landing.vue'
      )
  }
]
