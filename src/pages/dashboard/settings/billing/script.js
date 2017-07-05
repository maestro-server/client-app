'use strict'
import {mapActions} from 'vuex'

export default {
  methods: {
    ...mapActions([
      'setPage' // map this.increment() to this.$store.dispatch('increment')
    ])
  },
  mounted() {
    this.setPage([
      'Settings',
      'Profile, plan and billing',
      'fa-user'
    ])
  }
}
