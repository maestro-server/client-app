import Login from 'services/login'

export default {
  path: '/logout',
  beforeEnter: function(to, from, next) {
    Login.destroyLogin()
    next('/login')
  }
}
