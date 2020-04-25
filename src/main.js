'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'
import Notifications from 'vue-notifications'
import VueClipboard from 'vue-clipboard2'
import VeeValidate from 'vee-validate'
import VueBar from 'vuebar'
import VTooltip from 'v-tooltip'

import { ServerTable } from 'maestro-vue-tables-2'

import App from './App'
import router from './router'
import store from './store'
import mixins_forms from 'mixins/forms'
import components from './components'
import notifications_opt from './config/notifications'

Vue.use(Notifications, notifications_opt)
Vue.use(VueRouter)

Vue.use(ServerTable, {})
Vue.use(VueClipboard)
Vue.use(VueBar);
Vue.use(VeeValidate)
Vue.use(VTooltip)
Vue.mixin(mixins_forms)
Vue.use(components)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
