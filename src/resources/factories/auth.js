
import Factory from './factory'
import LocalStorageRepository from '../repositories/localStorage'

class Auth extends Factory {

  constructor(e='/users/auth') {
    super(e)
  }

  auth (data, callback) {
    return this.create(data, (e) => {
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
