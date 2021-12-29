import Vue from 'vue'
import Router from 'vue-router'
import routes from '@/router/routes'
import { store } from '@/store'
import * as types from '@/store/mutation-types'

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

router.beforeEach((to, from, next) => {
  switch (to.name) {
    case 'authError':
      setTimeout(() => {
        store.commit(types.SET_CLIENT_CONFIG, {
          layout: 'plain',
          themes: {
            primary: '#FF1744'
          }
        })
      }, 250)
      break
    case 'voaform':
    case 'voasummary':
      store
        .dispatch('getClientConfig', to)
        .catch(() => next({ name: 'authError' }))
      break
    default:
      store.dispatch('setLandingConfig')
  }
  return next()
})

export default router
