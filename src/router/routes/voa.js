export default [
  {
    path: '/voaform',
    name: 'voaform',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(
        /* webpackChunkName: "voafrom" */ '@/components/pages/voa/voaform.vue'
      )
  },
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
