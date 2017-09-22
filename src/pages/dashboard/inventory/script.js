'use strict'
import {mapActions} from 'vuex'
import tabMenu from '../_modules/tabMenu/tab-menu.vue'

export default {
  data () {
    return {
      submenu: {'servers': 'Servers', 'applications': 'Applications', 'system': 'System', 'datacenter':'Datacenters', 'clients':'Clients'}
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
      'Inventory',
      'Cloud CMDB, this area show all setups made in your infrastructure',
      'fa-th'
    ])
  }
}
