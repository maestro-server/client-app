'use strict'
import {mapActions} from 'vuex'
import topmenu from '../_modules/tabMenu/tab-menu.vue'

export default {
  data () {
    return {
      submenu: {'about': 'About'}
    }
  },

  methods: {
    ...mapActions([
      'setPage' // map this.increment() to this.$store.dispatch('increment')
    ])
  },

  mounted () {
    this.setPage([
      'Info',
      'Service info',
      'fa-cog'
    ])
  },

  components: {
    'tab-menu': topmenu
  }
}
