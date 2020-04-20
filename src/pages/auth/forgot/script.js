'use strict'
import Auth from 'factories/auth'
import base_url from 'src/resources/libs/base_url'

import store from 'src/store'

export default {
  name: 'forgot',

  computed: {
    logo_url () {
      return _.get(store.getters, 'get_options.logo_url')
    }
  },

  data: function () {
    return {
      model: {
        email: undefined
      },
      sended: false
    }
  },

  methods: {
    forgot: function () {

      this.$validator.validateAll().then(() => {
        const callback_url = `${base_url}#/auth/changepass`
        const data = Object.assign({}, this.model, { callback_url });

        new Auth(data, '/users/forgot')
          .create(() => this.sended = true)

      }).catch();

    }
  }

}
