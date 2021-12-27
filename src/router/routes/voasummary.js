export default [
  {
    path: '/voasummary/:id',
    name: 'voasummary',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(
        /* webpackChunkName: "voasummary" */ '@/components/pages/voa/voasummary.vue'
      )
  }
]
