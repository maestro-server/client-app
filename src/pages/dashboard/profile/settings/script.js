'use strict'

import _ from 'lodash'
import {mapActions} from 'vuex'
import Me from 'factories/me'
import Auth from 'factories/auth'
import FectherEntity from 'services/fetchEntity'


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

    me () {
      FectherEntity(Me)()
        .find((e) => _.merge(this.model, e.data))
    },

    updateProfile () {
      const data = _.omit(this.model, 'email')

      FectherEntity(Me)()
        .patch(this.finishJob, data, '?')
    },

    updateEmail () {
      const email = this.cemail

      FectherEntity(Me)()
        .patch(() => this.model.email = email, {email}, '?')
    },

    updatePassWord () {
      const {email} = this.model
      this.cpass = _.merge(this.cpass, {email})

      new Auth(this.cpass)
        .authorization()
        .patchID('pass')
    }
  },

  mounted () {
    this.me()
  }
}
