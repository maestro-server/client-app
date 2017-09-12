'use strict'

import CacheManager from 'services/cacheManager'


export default {
  SET_USER (state, user) {
    state.me = Object.assign(state.me, user)
    CacheManager({k: 'user', persistence: 'local'}).set(state.me)
  },

  SET_TENANT (state, tn) {
    state.tenant = tn
    CacheManager({k: 'tenant', persistence: 'local'}).set(tn)
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
