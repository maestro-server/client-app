'use strict'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import mixins_forms from 'mixins/forms'
import Notifications from 'vue-notification'

import Bootue from 'bootue'
import components from './components'
import VeeValidate from 'vee-validate'
import Vuebar from 'vuebar';
import VueClipboard from 'vue-clipboard2'



Vue.use(Bootue)
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
  template: '<App/>',
  components: {App}
})
