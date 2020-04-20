'use strict'


class FactoryStorage {

  constructor (key, store, expires = 60) {
    this.ACCESS = key
    this.store = store
    this.expires = expires
    return this
  }

  setKey (key) {
    this.ACCESS = key
    return this
  }

  createStore (result) {
    const seconds = this.expires * 1000
    const date = new Date().getTime() + seconds

    this.store.set(this.ACCESS, result, date)
    return this
  }

  restoreStore () {
    return this.store.get(this.ACCESS)
  }

  deleteStore () {
    this.store.remove(this.ACCESS)
  }

  eachStore (fn) {
    this.store.each(fn)
  }

  clearStore () {
    this.store.clearAll()
  }
}

export default FactoryStorage
