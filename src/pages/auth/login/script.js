'use strict'
import Auth from 'factories/auth'
import Login from 'services/login'

export default {
  name: 'login',

  data: function () {
    return {
      model: {
        email: undefined,
        password: undefined
      }
    }
  },

  methods: {
    login: function () {

      this.$validator.validateAll().then(() => {
        new Auth(this.model)
          .auth((e) => Login.setLogin(this, e))

      }).catch();

    }
  }

}
