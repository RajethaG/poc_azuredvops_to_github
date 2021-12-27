import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

const opts = {
  theme: {
    themes: {
      light: {
        primary: '#fff' // '#EF4BC7'
      }
    }
  }
}

Vue.prototype.$setTheme = function (themes) {
  if (!themes) {
    return
  }
  const a = this.$vuetify.theme.themes.light
  a.primary = themes.primary
  a.secondary = themes.secondary || themes.primary
  a.accent = themes.accent || themes.secondary || themes.primary
}

Vue.use(Vuetify)

export default new Vuetify(opts)
