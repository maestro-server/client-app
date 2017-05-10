import comp from './logout'

export default {
  path: '/logout',
  component: comp,
  beforeEnter: function(to, from, next) {

    next()
  }
}
