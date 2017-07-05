'use strict'
import Vue from 'vue'
import Vuex from 'vuex'

import state from './state/state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

// create the Vuex instance by combining the state and mutations objects
// then export the Vuex store for use by our components
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
