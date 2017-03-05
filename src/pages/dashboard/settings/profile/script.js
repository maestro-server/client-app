import {mapActions} from 'vuex'

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

    updateProfile () {

    },

    updatePassWord () {

    }
  },
  mounted() {
    this.setPage([
      'Settings',
      'Profile, plan and billing',
      'fa-user'
    ])
  }
}
