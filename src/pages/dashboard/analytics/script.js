'use strict'
import {mapActions} from 'vuex'
import tabMenu from '../_modules/tabMenu/tab-menu.vue'

export default {
  data () {
    return {
      submenu: {
        'graph-bussiness': 'Bussiness Graph',
        'projects': 'Projects'
      },
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
      'Analytics',
      'Create bussiness graphs, visualize depedencies.',
      'fa fa-sitemap'
    ])
  }
}
