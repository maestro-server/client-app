'use strict'

import _ from 'lodash'
import {mapActions} from 'vuex'

import mostMulti from './charts/most_multi.vue'
import mostSingle from './charts/most_single.vue'

import serverWidget from 'components/charts/servers_widget.vue'
import appsWidget from 'components/charts/apps_widget.vue'
import linksWidget from 'components/charts/links_widget.vue'

import systemWidget from 'components/charts/system_widget.vue'
import dcWidget from 'components/charts/dc_widget.vue'

import FectherEntity from 'services/fetchEntity'
import Servers from 'factories/servers'
import Applications from 'factories/applications'
import Datacenters from 'factories/datacenters'
import System from 'factories/system'

export default {
  name: 'home',

  components: {
    mostSingle,
    mostMulti,
    serverWidget,
    appsWidget,
    linksWidget,
    systemWidget,
    dcWidget
  },

  data () {
    return {
      limit: 300,
      results: {
        servers: {
          entity: Servers,
          items: [],
          found: 0
        },
        applications: {
          entity: Applications,
          items: [],
          found: 0
        },
        datacenters: {
          entity: Datacenters,
          items: [],
          found: 0
        },
        system: {
          entity: System,
          items: [],
          found: 0
        }
      },
      page: [
        'Overview',
        'A simple application to manage an IT operations team servers, including systems, applications and services.',
        'fa-cloud'],
      links: [
        { route: { name: 'servers' }, name: 'Server list', icon: 'fa-server' },
        { route: { name: 'application' }, name: 'Apps list', icon: 'fa-code' },
        { route: { name: 'loadbalance' }, name: 'Loadbalances list', icon: 'fa-tasks' },
        { route: { name: 'database' }, name: 'Databases list', icon: 'icon-database' },
        { route: { name: 'broker' }, name: 'Brokers/Streams list', icon: 'fa-magic' },
        { route: { name: 'ci-cd' }, name: 'CI/CD list', icon: 'fa-briefcase' },
        { route: { name: 'monitor' }, name: 'Monitoring list', icon: 'fa-bullhorn' },
        { route: { name: 'system' }, name: 'System list', icon: 'fa-briefcase' }
      ]
    }
  },

  methods: {
    makeChart (post, entity, key) {
      const { data } = post
      _.assign(this.results[key], data)
    },

    getLast (entity, offset = 0, limit = 5) {
      const result = _.get(this.results[entity], 'items', [])
      if (_.isArray(result)) {
        return _.slice(result, offset, (offset+limit))
      }
    },

    ...mapActions([
      'setPage' // map this.increment() to this.$store.dispatch('increment')
    ]),

    fetchData (entity, force=true) {
      _.forEach(this.results, (v, k) => {

        FectherEntity(v.entity)({ force })
          .find(e => this.makeChart(e, v.entity, k), { limit: this.limit })
      });
    }
  },

  mounted () {
    this.setPage(this.page)
    this.fetchData()
  }
}
