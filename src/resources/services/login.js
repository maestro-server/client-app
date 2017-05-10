import LocalStorageRepository from '../repositories/localStorage'

class Login {

  static setLogin (that, e) {
    const {user} = e.data

    new LocalStorageRepository('user').createStore(user)

    that.$store.dispatch('setUser', user)
    that.$router.push('/dashboard')
  }

  static destroyLogin (that) {
    that.$router.push('/login')
  }

}

export default Login
