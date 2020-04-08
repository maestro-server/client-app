'use strict'
import {mapActions} from 'vuex'
import tabMenu from '../_modules/tabMenu/tab-menu.vue'
import dcMenu from '../_modules/dcMenu/menu.vue'

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
        'auto-scaling': 'Auto Scaling',
        'object-storage': 'Object Storages',
        'container-orchestration': 'Containers Orchestration',
        'machine-learning': 'Machine Learning',
        'service-mesh': 'Service Mesh',
        'repository': 'Repository',
        'monitor': 'Monitoring System',
        'logs': 'Logs System',
        'smtp': 'Emails (smtps/mtas)',
        'corporate': 'Corporate (erp/financial)',
        'vpn': 'VPNs',
        'dns': 'DNS',
        'auth': 'Auth',
        'nas': 'NAS'
      }
    }
  },

  components: {
    tabMenu,
    dcMenu
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
