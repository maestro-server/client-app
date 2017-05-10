import {mapActions} from 'vuex'

import Users from 'factories/users'

export default {
  data: function () {
    return {
      valid: {
        pass: false,
        profile: false
      },

      profile: {
        country: null
      }
    }
  },

  methods: {
    ...mapActions([
      'setPage' // map this.increment() to this.$store.dispatch('increment')
    ]),

    me () {
      new Users()
        .me({}, (e) => this.profile = e.data)
    },

    updateProfile () {

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
