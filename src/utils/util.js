import * as types from '@/store/mutation-types'
import { store } from '../store'
export const buildSuccess = (
  payload,
  commit,
  resolve,
  resolveParam = undefined
) => {
  // commit(types.SHOW_LOADING, false)
  commit(types.SUCCESS, null)
  setTimeout(() => {
    return payload
      ? commit(types.SUCCESS, payload)
      : commit(types.SHOW_SUCCESS, false)
  }, 0)
  commit(types.ERROR, null)
  resolve(resolveParam)
}
export const notifyError = (commit, errorMessage) => {
  if (errorMessage) {
    commit(types.SET_NOTIFICATION, {
      msg: errorMessage,
      type: 'error'
    })
  }
}

export const handleError = (error, errorParams) => {
  const status = error?.response?.status

  if (errorParams) {
    if (status === 500 && errorParams.redirect500) {
      errorParams.router.push({
        name: 'error',
        params: { message: '500 Error occured' }
      })
    }
    if (status === 400 && errorParams.redirect400) {
      notifyError(store.commit, error.response.data.Message)
    }
    if (status === 401 && errorParams.redirect400) {
      notifyError(store.commit, error.response.data.Message)
    }
  }
}
