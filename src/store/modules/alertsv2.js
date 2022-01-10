import * as types from '@/store/mutation-types'

const getters = {
  showNotification: (state) => state.showNotification,
  notificationMessage: (state) => state.notificationMessage,
  notificationMessageParams: (state) => state.notificationParams,
  notificationTimeout: (state) => state.notificationTimeout,
  notificationType: (state) => state.notificationType
}

const mutations = {
  [types.SET_NOTIFICATION](state, payload) {
    if (payload === null) {
      state.notificationType = 'error'
      state.notificationMessage = null
      state.notificationParams = []
      state.showNotification = false
    } else {
      state.notificationTimeout =
        payload.timeout < 1 ? -1 : payload.timeout || 6000
      state.notificationMessage = payload.msg
      if (payload.params) {
        state.notificationParams = payload.params
      }
      state.notificationType = payload.type || 'error'
      state.showNotification = true
    }
  },
  [types.SHOW_NOTIFICATION](state, value) {
    state.showNotification = value
  }
  // [types.SUCCESS](state, payload) {
  //   if (payload === null) {
  //     state.notificationType = 'error'
  //     state.notificationMessage = null
  //     state.notificationParams = []
  //   } else {
  //     state.showNotification = true
  //     state.notificationTimeout =
  //       payload.timeout < 1 ? -1 : payload.timeout || 6000
  //     state.notificationMessage = payload.msg
  //     if (payload.params) {
  //       state.notificationParams = payload.params
  //     }
  //   }
  // },
  // // [types.SHOW_SUCCESS](state, payload) {
  // //   state.showSuccessMessage = !!payload
  // // },
  // [types.ERROR](state, payload) {
  //   if (payload === null) {
  //     state.showNotification = false
  //     state.notificationMessage = null
  //   } else {
  //     state.showNotification = true
  //     state.notificationMessage = payload
  //   }
  // },
  // [types.SHOW_ERROR](state, payload) {
  //   state.showErrorMessage = !!payload
  // }
}

const actions = {
  setNotification: ({ commit }, payload) => {
    commit(types.SET_NOTIFICATION, payload)
    // commit(types.SUCCESS, null)
    // setTimeout(() => {
    //   return payload
    //     ? commit(types.SUCCESS, payload)
    //     : commit(types.SHOW_SUCCESS, false)
    // }, 0)
    // commit(types.ERROR, null)
    // return new Promise((resolve) => {

    //   // buildSuccess(payload, commit, resolve, { param: 1 })
    // })
  }
}

const state = {
  showNotification: false,
  notificationMessage: null,
  notificationParams: [],
  notificationTimeout: -1,
  notificationType: 'error'
}

export default {
  state,
  getters,
  mutations,
  actions
}
