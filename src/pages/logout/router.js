'use strict'
import Login from 'services/login'

export default {
  name: 'logout',
  path: '/logout',
  beforeEnter: function(to, from, next) {
    Login.destroyLogin()
    next('/login')
  }
}
