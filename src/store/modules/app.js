import * as types from '@/store/mutation-types'
import { buildSuccess, handleError } from '@/utils/util.js'

const getters = {
  isAppBusy: (state) => state.tasks.length > 0,
  breadcrumbs: (state) => state.breadcrumbs
}

const mutations = {
  [types.ADD_TASK](state) {
    state.tasks.push(1)
  },
  [types.REMOVE_TASK](state) {
    setTimeout(() => state.tasks.pop(), 350)
  },
  [types.SET_BREADCRUMB](state, breadcrumb) {
    state.breadcrumbs = breadcrumb
  }
}

const actions = {
  setLandingConfig({ commit }) {
    commit(types.SET_CLIENT_CONFIG, {
      appTheme: {
        Layout: 'plain',
        Theme: '#0277BD'
      }
    })
  },
  addTask({ commit }, loader) {
    commit(types.ADD_TASK, loader)
  },
  removeTask({ commit }) {
    commit(types.REMOVE_TASK)
  },
  setBreadcrumb({ commit }, breadcrumb) {
    commit(types.SET_BREADCRUMB, breadcrumb)
  }
}

const state = {
  tasks: [],
  breadcrumbs: []
}

export default {
  state,
  getters,
  actions,
  mutations
}
