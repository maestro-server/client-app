'use strict'
import Auth from 'factories/auth'
import base_url from 'src/resources/libs/base_url'

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
        const callback_url = `${base_url}#/auth/changepass`
        const data = Object.assign({}, this.model, {callback_url});

        new Auth(data, '/users/forgot')
          .create()

      }).catch();

    }
  }

}
