'use strict'
import {mapActions} from 'vuex'
import tabMenu from '../_modules/tabMenu/tab-menu.vue'

export default {
  data () {
    return {
      submenu: {'scheduler': 'Schedule'},
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
      'Schedulers',
      'Setup, run, schedulers and jobs.',
      'fa fa-calendar'
    ])
  }
}
