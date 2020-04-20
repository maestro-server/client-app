'use strict'
import Login from 'services/login'
import CacheManager from 'services/cacheManager'

export default {
  name: 'logout',
  path: 'logout',
  beforeEnter: function (to, from, next) {
    Login.destroyLogin()
    CacheManager().clearAll()
    next('/auth/login')
  }
}
