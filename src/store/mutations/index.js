'use strict'

import CacheManager from 'services/cacheManager'


export default {
  SET_USER (state, user) {
    state.me = Object.assign(state.me, user)
    CacheManager({k: 'me_list', persistence: 'local'}).set(state.me)
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
  },

  CALL_OPTIONS (state, args) {
    state.options = Object.assign(state.options, args)
  }
}
