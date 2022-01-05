export default [
  {
    path: '/landingPage',
    name: 'landingPage',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(
        /* webpackChunkName: "landingpage" */ '@/components/pages/landingpage.vue'
      )
  }
]
