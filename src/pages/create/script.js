
import User from 'factories/users'
import store from 'store'

export default {
  name: 'login',

  data: function () {
    return {
      valid: false,
      model: {
        name: null,
        email: null,
        password: null}
    }
  },

  methods: {
    create () {
      new User()
        .create(
          this.model,
          this.finishCallBack
        )
    },

    finishCallBack (e) {
      console.log(e)
      let data = {
        show: true,
        title: `Welcome to Maestro, plz login with your new account`,
        type: "success"
      }

      store.dispatch('callAlert', {...data})
      this.$router.push('/login')
    }
  }

}
