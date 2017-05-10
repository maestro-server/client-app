import Auth from 'factories/auth'
import Login from 'services/login'

export default {
  name: 'login',

  data: function () {
    return {
      valid: false,
      model: {
        email: undefined,
        password: undefined
      }
    }
  },

  methods: {
    login: function (e) {

      this.$validator.validateAll().then(() => {

        new Auth()
          .auth(
            this.model,
            (e) => Login.setLogin(this, e)
          )

      }).catch((e) => {
        console.log(e)
      });
    }
  }

}
