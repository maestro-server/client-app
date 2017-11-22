'use strict'

import _ from 'lodash'


export default {
  setPage ({commit}, [title, subtitle = null, icon = null]) {
    commit('CHANGE_PAGE', ['title', title])
    commit('CHANGE_PAGE', ['subtitle', subtitle])
    commit('CHANGE_PAGE', ['icon', icon])
  },

  callAlert ({commit}, args) {
    commit('CALL_ALERT', {...args})
  },

  setUser ({commit}, args) {
    commit('SET_USER', args)
  },

  setTenant ({commit}, tenant) {
    commit('SET_TENANT', _.pick(tenant, ['name', '_id', 'email', 'avatar', 'refs']))
  },

  onSpinner ({commit}) {
    commit('SET_SPINNER', {show: true})
  },

  offSpinner ({commit}) {
    commit('SET_SPINNER', {show: false})
  },

  setSpinner ({commit}, args) {
    commit('SET_SPINNER', {...args})
  },

  callCache ({commit}, args) {
    commit('CALL_CACHE', {...args})
  },

  setOptions ({commit}, args) {
    commit('CALL_OPTIONS', {...args})
  }

}
