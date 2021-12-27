import * as types from '@/store/mutation-types'
import { buildSuccess, handleError } from '@/utils/util.js'

const getters = {
  showSuccessMessage: (state) => state.showSuccessMessage,
  successMessage: (state) => state.successMessage,
  successMessageParams: (state) => state.successMessageParams,
  successMessageTimeout: (state) => state.successMessageTimeout,
  showErrorMessage: (state) => state.showErrorMessage,
  errorMessage: (state) => state.errorMessage
}

const mutations = {
  [types.SUCCESS](state, payload) {
    if (payload === null) {
      state.showSuccessMessage = false
      state.successMessage = null
      state.successMessageParams = []
    } else {
      state.showSuccessMessage = true
      state.successMessageTimeout =
        payload.timeout < 1 ? -1 : payload.timeout || 6000
      console.log('i received  apayload of ', payload)
      state.successMessage = payload.msg
      if (payload.params) {
        state.successMessageParams = payload.params
      }
    }
  },
  [types.SHOW_SUCCESS](state, payload) {
    console.log('mutating show_success, value to ', !!payload)
    state.showSuccessMessage = !!payload
  },
  [types.ERROR](state, payload) {
    if (payload === null) {
      state.showErrorMessage = false
      state.errorMessage = null
    } else {
      state.showErrorMessage = true
      state.errorMessage = payload
    }
  },
  [types.SHOW_ERROR](state, payload) {
    state.showErrorMessage = !!payload
  }
}

const actions = {
  setAlert: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      buildSuccess(payload, commit, resolve, { param: 1 })
    })
  }
}

const state = {
  showSuccessMessage: false,
  successMessage: null,
  successMessageParams: [],
  successMessageTimeout: -1,
  showErrorMessage: false,
  errorMessage: null
}

export default {
  state,
  getters,
  mutations,
  actions
}
