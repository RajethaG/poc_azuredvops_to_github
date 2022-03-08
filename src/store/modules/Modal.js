import * as types from '@/store/mutation-types'

const getters = {
  getPDFState: (state) => state.isShowPDF
}

const mutations = {
  [types.SET_PDF](state, value) {
    state.isShowPDF = value
  }
}

const actions = {
  setPDFView: ({ commit }, value) => {
    commit(types.SET_PDF, value)
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
