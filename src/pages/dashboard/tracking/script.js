'use strict'
import { mapActions } from 'vuex'
import topmenu from '../_modules/tabMenu/tab-menu.vue'

export default {
  data () {
    return {
      submenu: { 'team/': 'Teams' }
    }
  },

  methods: {
    ...mapActions([
      'setPage' // map this.increment() to this.$store.dispatch('increment')
    ])
  },

  mounted () {
    this.setPage([
      'Tracking',
      'History Tracking',
      'fa-history'
    ])
  },

  components: {
    'tab-menu': topmenu
  }
}
