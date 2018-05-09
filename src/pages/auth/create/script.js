'use strict'

import User from 'factories/users'
import {EventBus} from 'src/resources/bus/bus-general.js'

export default {
  name: 'login',

  data: function () {
    return {
      valid: false,
      model: {
        name: null,
        email: null,
        password: null,
        verypassword: null
      }
    }
  },

  methods: {
    create() {
      this.$validator.validateAll().then((result) => {
        if(result) {
          new User(this.model)
            .create(this.finishCallBack)
        }
      })
    },

    finishCallBack() {
      let data = {
        show: true,
        title: `Welcome to Maestro, plz login with your new account`,
        type: "success"
      }

      EventBus.$emit('call-notify', data)
      this.$router.push({name: 'login'})
    }
  }

}
