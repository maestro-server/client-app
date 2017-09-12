'use strict'

import _ from 'lodash'
import store from 'src/store'
import CacheManager from 'services/cacheManager'

class Login {

  static getToken = () => CacheManager({k: 'x-access', persistence: 'local'}).find()

  static getUser = () => CacheManager({k: 'user', persistence: 'local'}).find(['_id', 'email'])

  static getID = () => _.get(Login.getUser(), '_id')

  static Authorization = () => `JWT ${Login.getToken()}`

  static setLogin (that, e) {
    const {user} = e.data
    store.dispatch('setUser', user)

    that.$router.push({name: 'dashboard'})
  }

  static destroyLogin () {
    CacheManager({k: 'user', persistence: 'local'}).remove()
    store.dispatch('setUser', {})
  }

}

export default Login
