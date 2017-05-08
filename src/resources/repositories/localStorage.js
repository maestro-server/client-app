
class LocalStorage {

  constructor() {
    this.ACCESS = 'x-access'
    return this
  }

  createStore (token) {
    try {
      localStorage.setItem(this.ACCESS, token)
    } catch(e) {
      console.log(e)
    }
  }

  restoreStore () {
    return localStorage.getItem(this.ACCESS)
  }
}

export default LocalStorage
