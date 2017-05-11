import {mapActions} from 'vuex'

import Users from 'factories/users'

export default {
  data: function () {
    return {
      valid: {
        pass: false,
        profile: false
      },

      model: {
        name: null,
        fullname: null
      }
    }
  },

  methods: {
    ...mapActions([
      'setPage' // map this.increment() to this.$store.dispatch('increment')
    ]),

    me () {
      new Users()
        .me({}, (e) => Object.assign(this.model, e.data))
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
