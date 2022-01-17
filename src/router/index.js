import Vue from 'vue'
import Router from 'vue-router'
import routes from '@/router/routes'
import { store } from '@/store'
import * as reqTypes from '@/services/api/api-types'

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
        store.dispatch('setErrorConfig')
      }, 250)
      break
    case 'error':
      setTimeout(() => {
        store.dispatch('setSoftErrorConfig')
      }, 250)
      break
    case reqTypes.INTEGRATION_VOA:
    case reqTypes.INTEGRATION_FRAUDPLUS:
    case reqTypes.SUMMARY_REQUEST:
      store
        .dispatch('getClientConfig', to)
        .catch(() => next({ name: 'authError' }))
      break
    case reqTypes.SUMMARY_REQUEST_INTERNAL:
      if (!store.state.client.config?.appTheme) {
        store
          .dispatch('getClientConfig', to)
          .catch(() => next({ name: 'authError' }))
      } else {
        return next()
      }
      break
    default:
      return next({
        name: 'error',
        params: { message: 'Direct access to page is forbidden' }
      })
  }
  return next()
})

export default router
