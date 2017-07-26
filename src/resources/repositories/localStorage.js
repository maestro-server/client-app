'use strict'

class LocalStorage {

  constructor(key='x-access') {
    this.ACCESS = key
    return this
  }

  setKey (key) {
    this.ACCESS = key
    return this
  }

  createStore (result) {
    if(_.isObject(result)) {
      result = JSON.stringify(result)
    }

    try {
      localStorage.setItem(this.ACCESS, result)
    } catch(e) {
      console.log(e)
    }

    return this
  }

  restoreStore () {
    const result = localStorage.getItem(this.ACCESS)

    if(!_.isEmpty(result)) {
      try {
        return JSON.parse(result)
      } catch(e) {
        return result
      }
    }
  }

  deleteStore () {
    localStorage.removeItem(this.ACCESS)
  }
}

export default LocalStorage
