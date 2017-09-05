'use strict'
import {mapActions} from 'vuex'
import topmenu from '../_modules/tabMenu/tab-menu.vue'

export default {
  data () {
    return {
      submenu: {'team/': 'Teams', 'projects': 'Projects'}
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
      'Team, users and acess rules',
      'fa-users'
    ])
  },

  components: {
    'tab-menu': topmenu
  }
}
