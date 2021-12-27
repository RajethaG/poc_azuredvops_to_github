import Vue from 'vue'

const files = require.context('.', false, /\.vue$/)
// const modules = {}
files.keys().forEach((key) => {
  if (key === './_loaders.js') {
    return
  }
  const k1 = key.replace(/(\.\/|\.vue)/g, '')
  // modules[k1] = files(key)
  Vue.component(k1, () => import(`${key}`))
})
