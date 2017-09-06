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
      FectherEntity(Me)(this)({k: 'me'})
        .find((e) => _.merge(this.model, e.data))
    },

    updateProfile () {
      const data = _.omit(this.model, 'email')

      FectherEntity(Me)(this)({k: 'me'})
        .update(this.finishJob, data, '?')
    },

    updateEmail () {
      const email = this.cemail

      FectherEntity(Me)(this)({k: 'me'})
        .update(() => {this.model.email = email}, {email}, '?')
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
    this.setPage([
      'Settings',
      'Profile, plan and billing',
      'fa-user'
    ])
  }
}
