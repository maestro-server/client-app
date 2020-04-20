'use strict'

import Factory from './factory'
import CacheManager from 'services/cacheManager'


class Auth extends Factory {

  static ename = 'auth'

  constructor(model={}, e='users/auth') {
    super(model, e)
    this.setName(Auth.ename)
  }

  auth (callback) {
    return this.create((e) => {
      this.success(e)
      callback(e)
    })
  }

  success (result) {
    CacheManager({k: 'x-access', persistence: 'local', time: 860000}).set(result.data.token)
  }
}

export default Auth
