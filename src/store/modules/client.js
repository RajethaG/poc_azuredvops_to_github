import * as types from '@/store/mutation-types'
import api from '@/services/api/client'
import { buildSuccess, handleError } from '@/utils/util.js'

const getters = {
  isClientConfigured: (state) => !!state.themeName,
  themeName: (state) => state.config?.themeName,
  themes: (state) => state.config?.themes,
  config: (state) => state.config
}

const actions = {
  getClientConfig: ({ commit }, client) => {
    const token = client.query?.tk
    if (!token) {
      return new Promise((resolve, reject) => {
        reject(new Error('invalid token'))
      })
    }

    return new Promise((resolve, reject) => {
      commit(types.ADD_TASK)
      api
        .getClientConfig(token)
        .then((response) => {
          if (response && response.status === 200) {
            commit(types.SET_CLIENT_CONFIG, response.data)
            resolve()
          }
        })
        .catch(() => {
          reject()
        })
        .finally(() => commit(types.REMOVE_TASK))
    })
  }
}

const mutations = {
  [types.SET_CLIENT_CONFIG](state, config) {
    if (config !== null) {
      state.config = config
    }
  }
}

const state = {
  config: {
    themeName: null,
    themes: null,
    layout: '',
    appTheme: '',
    productsList: []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
