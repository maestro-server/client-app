import Vue from 'vue'
import Router from 'vue-router'

import home from 'pages/home/router'
import dashboard from 'pages/dashboard/router'
import login from 'pages/login/router'
import logout from 'pages/logout/router'

import forgot from 'pages/forgot/router'
import create from 'pages/create/router'

import Login from 'services/login'


Vue.use(Router)

 let router = new Router({
  routes: [
    home,
    dashboard,
    login,
    logout,
    forgot,
    create
  ]
})

// Dont worry, each request api verify if token is valid,

router.beforeEach((to, from, next) => {
  const regex = /dashboard/

  if(regex.test(to.path, from.path) && !Login.getToken()) {
    next('/login')
  }
  next()
})

export default router
