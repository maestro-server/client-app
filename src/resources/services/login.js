'use strict'
import store from 'store'
import LocalStorageRepository from '../repositories/localStorage'

class Login {

  static getToken = () => new LocalStorageRepository().restoreStore()

  static getUser = () => new LocalStorageRepository('user').restoreStore()

  static getID = () => Login.getUser()._id

  static Authorization = () => `JWT ${Login.getToken()}`

  static setLogin (that, e) {
    const {user} = e.data
    new LocalStorageRepository('user').createStore(user)

    that.$router.push('/dashboard')
  }

  static destroyLogin () {
    new LocalStorageRepository().deleteStore()
    store.dispatch('setUser', {})
  }

}

export default Login
