'use strict'
export default {
  SET_USER (state, user) {
    state.me = Object.assign(state.me, user)
  },

  SET_TENANT (state, tn) {
    state.tenant = Object.assign(state.tenant, tn)
  },

  CHANGE_PAGE (state, [key, val]) {
    state.viewer[key] = val
  },

  CALL_ALERT (state, args) {
    state.alert = Object.assign(state.alert, args)
  },

  SET_SPINNER (state, args) {
    state.spinner = Object.assign(state.spinner, args)
  },

  CALL_CACHE (state, args) {
    state.cache = Object.assign(state.cache, args)
  }
}
