export default [
  {
    path: '/pdfviewer',
    name: 'pdfviewer',
    meta: {
      requiresAuth: false
    },
    props: true,
    component: () =>
      import(
        // eslint-disable-next-line max-len
        /* webpackChunkName: "landing" */ '@/components/sections/pdfViewer.vue'
      )
  }
]
