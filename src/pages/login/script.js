
import Auth from 'factories/auth'

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
    login: function () {

      new Auth()
        .auth(
          this.model,
          () => this.$router.push('/dashboard')
        )
    }
  }

}
