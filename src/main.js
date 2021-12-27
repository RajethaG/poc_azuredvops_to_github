import Vue from 'vue'
// import '@/plugins/axios'
import vuetify from '@/plugins/vuetify'
import '@/plugins/veevalidate'
import App from './App.vue'
import router from '@/router'
import { store } from '@/store'

import '@/components/sections/_loader.js'

Vue.config.productionTip = false
// Vue.use(VuetifyConfirm, { vuetify })
Vue.use({ vuetify })

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
  created() {
    store.dispatch('getClientConfig')
    // if (!store.client.isClientConfigured) {
    //   store.dispatch('getClientConfig')
    // }
    // if (store.getters.isTokenSet) {
    // store.dispatch('autoLogin')
    // }
  }
}).$mount('#app')
