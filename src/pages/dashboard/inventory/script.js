'use strict'
import {mapActions} from 'vuex'
import tabMenu from '../_modules/tabMenu/tab-menu.vue'

export default {
  data () {
    return {
      submenu: {
        'servers': 'Servers',
        'applications': 'Applications',
        'loadbalances': 'LoadBalances',
        'databases': 'Databases',
        'system': 'System',
        'datacenter':'Datacenters',
        'clients':'Clients'
      },
      'more': {
        'cache': 'Cache',
        'brokers': 'Brokers/Streams',
        'serverless': 'Serverless',
        'api-gateway': 'Api Gateway',
        'cdn': 'CDNs',
        'object-storage': 'Object Storages',
        'containers-orchestration': 'Containers Orchestration',
        'monitor': 'Monitoring System',
        'logs': 'Logs System'
      }
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
