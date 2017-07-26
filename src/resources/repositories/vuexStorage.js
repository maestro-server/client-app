'use strict'

import store from 'src/store'

class VuexStorage {

  constructor(key='x-access') {
    this.ACCESS = key
    return this
  }

  setKey (key) {
    this.ACCESS = key
    return this
  }

  createStore (result) {
    const prep = {[this.ACCESS]: result}
    return store.dispatch('callCache', prep)
  }

  restoreStore () {
    const cache = store.state.cache

    if(cache.hasOwnProperty(this.ACCESS)) {
      return cache[this.ACCESS]
    }
  }

  deleteStore () {
    localStorage.removeItem(this.ACCESS)
  }
}

export default VuexStorage
