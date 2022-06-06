import * as types from '@/store/mutation-types'

const getters = {
  getPDFState: (state) => state.isShowPDF,
  getModalState: (state) => state.isShowModal
}

const mutations = {
  [types.SET_PDF](state, value) {
    state.isShowPDF = value
  },
  [types.SET_MODAL](state, value) {
    state.isShowModal = value
  }
}

const actions = {
  setPDFView: ({ commit }, value) => {
    commit(types.SET_PDF, value)
  },
  setModalView: ({ commit }, value) => {
    commit(types.SET_MODAL, value)
  }
}

const state = {
  isShowPDF: false,
  isShowModal: false
}

export default {
  state,
  getters,
  mutations,
  actions
}
