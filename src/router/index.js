import Vue from 'vue'
import Router from 'vue-router'
import routes from '@/router/routes'
// import { store } from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...routes,
    {
      path: '/nextpage',
      name: 'nextpage',
      component: () => import('@/components/pages/nextpage.vue')
    }
  ]
})

export default router
