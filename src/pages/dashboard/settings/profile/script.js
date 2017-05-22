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
        .get({}, (e) => _.merge(this.model, e.data))
    },

    updateProfile () {
      const data = _.omit(this.model, 'email')

      new Me()
        .authorization()
        .update(data)
    },

    updateEmail () {
      const email = this.cemail

      new Me()
        .authorization()
        .update({email}, () => {this.model.email = email})
    },

    updatePassWord () {
      const {email} = this.model
      this.cpass = _.merge(this.cpass, {email})

      new Auth()
        .authorization()
        .patchID('pass', this.cpass)
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
