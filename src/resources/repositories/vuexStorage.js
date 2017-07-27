'use strict'

import _ from 'lodash'
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
    const content = this.restoreStore()
    const newValue = _.omit(content, this.ACCESS)
    this.createStore(newValue)
  }
}

export default VuexStorage
