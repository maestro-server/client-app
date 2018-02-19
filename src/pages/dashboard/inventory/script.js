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
        'cache': 'Distributed Cache',
        'broker': 'Brokers/Streams',
        'ci-cd': 'CI/CD',
        'serverless': 'Serverless',
        'service-discovery': 'Services Discovery',
        'api-gateway': 'Api Gateway',
        'cdn': 'CDNs',
        'object-storage': 'Object Storages',
        'container-orchestration': 'Containers Orchestration',
        'service-mesh': 'Service Mesh',
        'repository': 'Repository',
        'monitor': 'Monitoring System',
        'logs': 'Logs System',
        'smtp': 'Emails (smtps/mtas)',
        'vpn': 'VPNs',
        'dns': 'DNS',
        'auth': 'Auth',
        'nas': 'NAS'
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
