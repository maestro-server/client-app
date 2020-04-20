'use strict'
import Auth from 'factories/auth'
import Login from 'services/login'

import store from 'src/store'

export default {
  name: 'login',

  computed: {
    logo_url () {
      return _.get(store.getters, 'get_options.logo_url')
    }
  },

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
