'use strict'
import {mapActions} from 'vuex'
import topmenu from '../_modules/tabMenu/tab-menu.vue'

export default {
  data () {
    return {
      submenu: {'team/': 'Teams'}
    }
  },

  methods: {
    ...mapActions([
      'setPage' // map this.increment() to this.$store.dispatch('increment')
    ])
  },

  mounted () {
    this.setPage([
      'Team',
      'Team, users and access rules',
      'fa-users'
    ])
  },

  components: {
    'tab-menu': topmenu
  }
}
