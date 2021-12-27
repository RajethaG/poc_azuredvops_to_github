import * as types from '@/store/mutation-types'
// import { store } from '@/store'

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
