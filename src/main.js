// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import mcore from 'bootstrap/mcore'
import mdirectives from 'bootstrap/mdirectives'

Vue.use(mcore)
Vue.use(mdirectives)

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
