'use strict'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import mixins_forms from 'mixins/forms'

import bootue from './components'
import VeeValidate from 'vee-validate'
import {ServerTable} from 'maestro-vue-tables-2'


Vue.use(bootue)
Vue.use(VeeValidate)
Vue.mixin(mixins_forms)
Vue.use(ServerTable, {})

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
