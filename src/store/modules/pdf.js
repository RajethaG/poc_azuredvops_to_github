import * as types from '@/store/mutation-types'

const getters = {
  showPDFState: (state) => state.showPDF
}

const mutations = {
  [types.SET_PDF](state, payload) {
    state.showPDF = payload
  }
}

const actions = {
  setPDFView: ({ commit }, payload) => {
    console.log('inside action')
    commit(types.SET_PDF, payload)
  }
}

const state = {
  showPDF: false
}

export default {
  state,
  getters,
  mutations,
  actions
}
