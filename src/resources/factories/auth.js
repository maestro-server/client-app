
import Factory from './factory'
import LocalStorageRepository from '../repositories/localStorage'

class Auth extends Factory {

  constructor(model={}, e='/users/auth') {
    super(model, e)
  }

  auth (callback) {
    return this.create((e) => {
      this.success(e)
      callback(e)
    })
  }

  success (result) {
    new LocalStorageRepository()
      .createStore(result.data.token)
  }
}

export default Auth
