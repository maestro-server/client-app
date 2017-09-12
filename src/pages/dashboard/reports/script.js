'use strict'
import {mapActions} from 'vuex'
import tabMenu from '../_modules/tabMenu/tab-menu.vue'

export default {
  data () {
    return {
      submenu: {'servers': 'Servers', 'applications': 'Applications', 'system': 'System', 'datacenter':'Datacenters', 'clients':'Clients'},
      reference: null,
      teams: ['teste']
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
      'Cloud Reports',
      'Create and mananger custom reports',
      'fa-map'
    ])
  }
}
