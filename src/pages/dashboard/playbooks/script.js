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
      'Cloud Playbooks',
      'Setup and run yours playbooks, jobs and terraforms rules.',
      'icon-ansible'
    ])
  }
}
