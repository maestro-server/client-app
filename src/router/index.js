import Vue from 'vue'
import Router from 'vue-router'
import dashboard from 'views/dashboard/dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: dashboard
    }
  ]
})
