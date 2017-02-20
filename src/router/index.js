import Vue from 'vue'
import Router from 'vue-router'

import dashboard from 'views/dashboard/router'
import login from 'views/login/router'

Vue.use(Router)

export default new Router({
  routes: [
    dashboard,
    login
  ]
})
