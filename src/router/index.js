import Vue from 'vue'
import Router from 'vue-router'

import home from 'src/pages/home/router'
import dashboard from 'src/pages/dashboard/router'
import login from 'src/pages/login/router'
import logout from 'src/pages/logout/router'

import forgot from 'src/pages/forgot/router'
import changepass from 'src/pages/changepass/router'
import create from 'src/pages/create/router'

import Login from 'services/login'


Vue.use(Router)

 let router = new Router({
  routes: [
    home,
    dashboard,
    login,
    logout,
    forgot,
    changepass,
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
