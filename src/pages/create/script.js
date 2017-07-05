'use strict'

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
      new User(this.model)
        .create(
          this.finishCallBack
        )
    },

    finishCallBack () {
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
