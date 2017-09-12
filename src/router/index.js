'use strict'
import Vue from 'vue'
import Router from 'vue-router'

import home from 'src/pages/home/router'
import dashboard from 'src/pages/dashboard/router'
import auth from 'src/pages/auth/router'

import Login from 'services/login'


Vue.use(Router)

 let router = new Router({
  routes: [
    home,
    dashboard,
    auth
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
