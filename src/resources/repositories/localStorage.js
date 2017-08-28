'use strict'

import store from 'store'
import expirePlugin from 'store/plugins/expire'
store.addPlugin(expirePlugin)


class LocalStorage {

  constructor(key='x-access') {
    this.ACCESS = key
    return this
  }

  setKey (key) {
    this.ACCESS = key
    return this
  }

  createStore (result, expires=60) {
    const seconds = expires * 1000
    const date = new Date().getTime() + seconds

    store.set(this.ACCESS, result, date)
    return this
  }

  restoreStore () {
    return store.get(this.ACCESS)
  }

  deleteStore () {
    store.remove(this.ACCESS)
  }
}

export default LocalStorage
