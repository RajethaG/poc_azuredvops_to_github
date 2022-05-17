import * as types from '@/store/mutation-types'
import api from '@/services/api/client'
import { buildSuccess, handleError, notifyError } from '@/utils/util.js'

const getters = {
  isClientConfigured: (state) => !!state.themeName,
  themeName: (state) => state.config?.themeName,
  themes: (state) => state.config?.themes,
  config: (state) => state.config
}

const actions = {
  getClientConfig: ({ commit }, client) => {
    return new Promise((resolve, reject) => {
      commit(types.ADD_TASK)
      api
        .getClientConfig(client)
        .then((response) => {
          if (response && response.status === 200) {
            commit(types.SET_CLIENT_CONFIG, response.data)
            resolve()
          } else {
          }
        })
        .catch((error) => {
          reject()
        })
        .finally(() => commit(types.REMOVE_TASK))
    })
  },
  doPOST: (
    { commit },
    { product, payload, token, successMsg, errorMessage, errorParams }
  ) => {
    return new Promise((resolve, reject) => {
      commit(types.ADD_TASK)
      api
        .doPOST({ product, payload, token })
        .then((response) => {
          if (
            response &&
            (response.status === 200 || response.responseStatus === 1)
          ) {
            if (successMsg) {
              commit(types.SET_NOTIFICATION, {
                msg: successMsg,
                type: 'success'
              })
            }
            resolve(response.data)
          }
        })
        .catch((error) => {
          notifyError(commit, errorMessage)
          handleError(error, errorParams)
          reject()
        })
        .finally(() => commit(types.REMOVE_TASK))
    })
  },
  doGET: (
    { commit },
    { getType, params, successMsg, errorMessage, errorParams }
  ) => {
    return new Promise((resolve, reject) => {
      commit(types.ADD_TASK)
      api
        .doGET({ getType, params })
        .then((response) => {
          if (response && response.status === 200) {
            if (successMsg) {
              commit(types.SET_NOTIFICATION, {
                msg: successMsg,
                type: 'success'
              })
            }
            resolve(response.data)
          }
        })
        .catch((error) => {
          handleError(error, errorParams)

          notifyError(commit, errorMessage)

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
