'use strict'
import {mapActions} from 'vuex'
import topmenu from '../_modules/tabMenu/tab-menu.vue'

export default {
  data () {
    return {
      submenu: {'settings': 'Profile', 'billing': 'Billing'}
    }
  },

  methods: {
    ...mapActions([
      'setPage' // map this.increment() to this.$store.dispatch('increment')
    ])
  },

  mounted () {
    this.setPage([
      'Settings',
      'Profile, plan and billing',
      'fa-user'
    ])
  },

  components: {
    'tab-menu': topmenu
  }
}
