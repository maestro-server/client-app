import Vue from 'vue'
import Router from 'vue-router'

import home from 'pages/home/router'
import dashboard from 'pages/dashboard/router'
import login from 'pages/login/router'
import forgot from 'pages/forgot/router'
import create from 'pages/create/router'


Vue.use(Router)

export default new Router({
  routes: [
    home,
    dashboard,
    login,
    forgot,
    create
  ]
})
