import * as types from '@/services/api/api-types.js'
export default [
  {
    path: '/pdfviewer',
    name: types.PDF_VIEWER,
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
