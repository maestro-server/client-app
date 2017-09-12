'use strict'


class FactoryStorage {

  constructor(key = 'x-access', store) {
    this.ACCESS = key
    this.store = store
    return this
  }

  setKey(key) {
    this.ACCESS = key
    return this
  }

  createStore(result, expires = 60) {
    const seconds = expires * 1000
    const date = new Date().getTime() + seconds

    this.store.set(this.ACCESS, result, date)
    return this
  }

  restoreStore() {
    return this.store.get(this.ACCESS)
  }

  deleteStore() {
    this.store.remove(this.ACCESS)
  }

  clearStore() {
    this.store.clearAll()
  }
}

export default FactoryStorage
