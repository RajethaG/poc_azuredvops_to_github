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
  }
]
