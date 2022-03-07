import * as types from '@/store/mutation-types'

const getters = {
  getPDFState: (state) => state.isShowPDF
}

const mutations = {
  [types.SET_PDF](state, payload) {
    state.isShowPDF = payload
  }
}

const actions = {
  setPDFView: ({ commit }, payload) => {
    commit(types.SET_PDF, payload)
  }
}

const state = {
  isShowPDF: false
}

export default {
  state,
  getters,
  mutations,
  actions
}
