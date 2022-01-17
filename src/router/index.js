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

const flowThroughNext = (requireConfig, to, next) => {
  const appTheme = store.state.client.config?.appTheme
  if (requireConfig && !appTheme) {
    store
      .dispatch('getClientConfig', to)
      .catch(() => next({ name: 'authError' }))
  } else if (!appTheme) {
    store.dispatch('setLandingConfig')
  }

  return next()
}

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
    case reqTypes.PDF_VIEWER:
      return flowThroughNext(false, to, next)
    case reqTypes.SUMMARY_REQUEST_INTERNAL:
      return flowThroughNext(true, to, next)

    default:
      return next({
        name: 'error',
        params: { message: 'Direct access to page is forbidden' }
      })
  }
  return next()
})

export default router
