'use strict'
import Auth from 'factories/auth'

export default {
  name: 'forgot',

  data: function () {
    return {
      model: {
        email: undefined
      }
    }
  },

  methods: {
    forgot: function () {

      this.$validator.validateAll().then(() => {
        const callback_url = `${BASE_URL}#/changepass`
        const data = Object.assign({}, this.model, {callback_url});

        new Auth(data, '/users/forgot')
          .create()

      }).catch();

    }
  }

}
