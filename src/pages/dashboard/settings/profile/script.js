'use strict'
import {mapActions} from 'vuex'
import Me from 'factories/me'
import Auth from 'factories/auth'

import _ from 'lodash'

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
      new Me()
        .authorization()
        .list((e) => _.merge(this.model, e.data))
    },

    updateProfile () {
      const data = _.omit(this.model, 'email')

      new Me(data)
        .authorization()
        .update()
    },

    updateEmail () {
      const email = this.cemail

      new Me({email})
        .authorization()
        .update(() => {this.model.email = email})
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
