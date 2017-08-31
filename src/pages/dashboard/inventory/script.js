'use strict'
import {mapActions} from 'vuex'
import topMenu from '../_modules/top-menu/top-menu.vue'

export default {
  data () {
    return {
      submenu: {'servers': 'Servers', 'applications': 'Applications', 'system': 'System', 'datacenter':'Datacenters', 'clients':'Clients'},
      reference: null,
      teams: ['teste']
    }
  },

  components: {
    topMenu
  },

  methods: {
    ...mapActions([
      'setPage'
    ])
  },

  mounted() {
    this.setPage([
      'Cloud Inventory',
      'Database on all its infra',
      'fa-th'
    ])
  }
}
