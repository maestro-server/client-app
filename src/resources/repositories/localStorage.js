
class LocalStorage {

  constructor(key='x-access') {
    this.ACCESS = key
    return this
  }

  setKey (key) {
    this.ACCESS = key
    return this
  }

  createStore (token) {
    try {
      localStorage.setItem(this.ACCESS, token)
    } catch(e) {
      console.log(e)
    }

    return this
  }

  restoreStore () {
    return localStorage.getItem(this.ACCESS)
  }
}

export default LocalStorage
