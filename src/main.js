'use strict'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import mixins_forms from 'mixins/forms'
import Notifications from 'vue-notification'
import components from './components'
import VeeValidate from 'vee-validate'
import Vuebar from 'vuebar';
import VueClipboard from 'vue-clipboard2'

import { ServerTable, ClientTable } from 'maestro-vue-tables-2'
import VueNotifications from 'vue-notifications'
import iziToast from 'izitoast'


const toast = ({title, message, type, timeout, position = 'topRight'}) => iziToast[type]({title, message, timeout, position})
const options = {
  success: toast,
  error: toast,
  info: toast,
  warning: toast
}
Vue.use(VueNotifications, options)


Vue.use(ServerTable, {})
Vue.use(ClientTable, {})
Vue.use(components)
Vue.use(VeeValidate)
Vue.mixin(mixins_forms)
Vue.use(Notifications)
Vue.use(VueClipboard)
Vue.use(Vuebar);

new Vue({
  store,
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
