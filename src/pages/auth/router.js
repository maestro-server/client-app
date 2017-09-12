'use strict'
import comp from './auth'
import changepass from './changepass/router'
import create from './create/router'
import forgot from './forgot/router'
import login from './login/router'
import logout from './logout/router'

export default {
  path: '/auth',
  component: comp,
  children: [
    changepass,
    create,
    forgot,
    login,
    logout
  ]
}
