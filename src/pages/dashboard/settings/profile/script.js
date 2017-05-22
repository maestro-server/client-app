import {mapActions} from 'vuex'
import Me from 'factories/me'

import _ from 'lodash'

export default {

  data: function () {
    return {
      valid: {
        pass: false,
        profile: false
      },
      email: null,
      pass: {},
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
      new Me()
        .authorization()
        .update(
          this.model
        )
    },

    updatePassWord () {

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
