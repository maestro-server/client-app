'use strict'

import _ from 'lodash'
import {mapActions} from 'vuex'
import Me from 'factories/me'
import Auth from 'factories/auth'
import FectherEntity from 'services/fetchEntity'
import fsuccess from 'src/resources/callbacks/request_success'

import {EventBus} from 'src/resources/bus/bus-general.js';

export default {
  data: function () {
    return {
      cemail: null,
      cpass: {},
      model: {
        email: null,
        name: null
      }
    }
  },


  methods: {
    ...mapActions([
      'setPage' // map this.increment() to this.$store.dispatch('increment')
    ]),

    me(force = true) {
      FectherEntity(Me)({force})
        .find((e) => _.merge(this.model, e.data))
    },

    updateProfile() {
      const data = _.omit(this.model, 'email')

      FectherEntity(Me)()
        .patch(() => {
          EventBus.$emit('update-profile', this.model)
          fsuccess()
        }, data, '?')
    },

    updateEmail() {
      const email = this.cemail

      if (email) {
        FectherEntity(Me)()
          .patch(() => {
            this.model.email = email
            fsuccess()
          }, {email}, '?')
      }
    },

    updatePassWord() {
      const {email} = this.model
      this.cpass = _.merge(this.cpass, {email})

      new Auth(this.cpass)
        .authorization()
        .patchID('pass')
    }
  },

  mounted() {
    this.me()
  }
}
