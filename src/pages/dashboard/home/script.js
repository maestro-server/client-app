'use strict'

import _ from 'lodash'
import {mapActions} from 'vuex'

import mostMulti from './charts/most_multi.vue'
import mostSingle from './charts/most_single.vue'

import serverWidget from './components/servers_widget.vue'
import appsWidget from './components/apps_widget.vue'
import linksWidget from './components/links_widget.vue'

import systemWidget from './components/system_widget.vue'
import dcWidget from './components/dc_widget.vue'

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
      result: {servers:[], applications:[], datacenters: [], system: []},
      load:{system: false, applications: false, datacenters: false, servers:false},
      links: [
        {route: {name: 'servers'}, name: 'Server list', icon: 'fa-server'},
        {route: {name: 'application'}, name: 'Apps list', icon: 'fa-code'},
        {route: {name: 'loadbalance'}, name: 'Loadbalances list', icon: 'fa-tasks'},
        {route: {name: 'database'}, name: 'Databases list', icon: 'icon-database'},
        {route: {name: 'broker'}, name: 'Brokers/Streams list', icon: 'fa-magic'},
        {route: {name: 'ci-cd'}, name: 'CI/CD list', icon: 'fa-briefcase'},
        {route: {name: 'monitor'}, name: 'Monitoring list', icon: 'fa-bullhorn'},
        {route: {name: 'system'}, name: 'System list', icon: 'fa-briefcase'}
      ]
    }
  },

  methods: {
    makeChart(post, entity) {
      const {data} = post
      this.result[entity.name.toLowerCase()] = data
      this.load[entity.name.toLowerCase()] = true
    },

    getLast(entity, offset = 0, limit = 5) {
      const result = _.get(this.result, entity+'.items', [])
      if(_.isArray(result)) {
        return  _.slice(result, offset, (offset+limit))
      }
    },

    ...mapActions([
      'setPage' // map this.increment() to this.$store.dispatch('increment')
    ]),

    fetchData (entity, force=true) {
      FectherEntity(entity)({force})
        .find(e=>this.makeChart(e, entity), {limit: this.limit})
    },
  },

  created () {
    this.setPage([
      'Overview',
      'A simple application to manage an IT operations team servers, including systems, applications and services.',
      'fa-cloud'])
    this.fetchData(Servers)
    this.fetchData(Applications)
    this.fetchData(Datacenters)
    this.fetchData(System)
  }
}
