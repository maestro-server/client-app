'use strict'
import {mapActions} from 'vuex'
import tabMenu from '../_modules/tabMenu/tab-menu.vue'

export default {
  data () {
    return {
      submenu: {'exports': 'Reports', 'events': 'Events'},
      reference: null
    }
  },

  components: {
    tabMenu
  },

  methods: {
    ...mapActions([
      'setPage'
    ])
  },

  mounted() {
    this.setPage([
      'Reports',
      'Create your own reports, schedule and exports.',
      'fa-map'
    ])
  }
}
