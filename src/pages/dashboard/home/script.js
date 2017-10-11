'use strict'

import _ from 'lodash'
import {mapActions} from 'vuex'

import doughnutChart from './components/doughnut_chart.vue'
import barChart from './components/bar_chart.vue'
import pieChart from './components/pie_chart.vue'

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
    doughnutChart,
    barChart,
    pieChart,
    serverWidget,
    appsWidget,
    linksWidget,
    systemWidget,
    dcWidget
  },

  data () {
    return {
      colors: ["#2B8B7E", "#FCDA0E", "#2B69AC", "#0E0184", "#5B5DC2", "#D21E94", "#8CA445", "#280AF0", "#3F6DEC", "#91FC1A", "#41923C", "#9B04BD", "#FF7920", "#89DD6E", "#6F7C71", "#F2F1A2"],
      result: {servers:[], applications:[], datacenters: []},
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: ["#2B8B7E", "#FCDA0E", "#2B69AC", "#0E0184", "#5B5DC2", "#D21E94", "#8CA445", "#280AF0", "#3F6DEC", "#91FC1A", "#41923C", "#9B04BD", "#FF7920", "#89DD6E", "#6F7C71", "#F2F1A2"],
            data: [40, 39, 10, 40, 39, 80, 40]
          }
        ]
      },
      links: [
        {route: {name: 'servers'}, name: 'Server list', icon: 'fa-server'},
        {route: {name: 'applications'}, name: 'Apps list', icon: 'fa-code'},
        {route: {name: 'loadbalances'}, name: 'Loadbalances list', icon: 'fa-tasks'},
        {route: {name: 'databases'}, name: 'Databases list', icon: 'icon-database'},
        {route: {name: 'brokers'}, name: 'Brokers/Streams list', icon: 'fa-magic'},
        {route: {name: 'ci-cd'}, name: 'CI/CD list', icon: 'fa-briefcase'},
        {route: {name: 'monitor'}, name: 'Monitoring list', icon: 'fa-bullhorn'},
        {route: {name: 'system'}, name: 'System list', icon: 'fa-briefcase'}
      ]
    }
  },

  computed: {
    getMostServices() {
      if(this.getLast('servers').length > 0) {
        const labels = []
        const info = []

        this.result.servers.items.map(e=> {
          const {services} = e

          services.map(sev=>{
            const index = _.indexOf(labels, sev.name)

            if(index === -1) {
              labels.push(sev.name)
              info.push(0)
            } else {
              info[index]++
            }
          })
        })

        const data = info.slice(0, 10)

        let prepared = {
          labels,
          datasets: [
            {backgroundColor: this.colors, data}
          ]
        }

        return prepared
      }
    }
  },

  methods: {
    makeChart(post, entity) {
      const {data} = post
      this.result[entity.name.toLowerCase()] = data
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

    fetchData (entity, force=false) {
      FectherEntity(entity)({force})
        .find(e=>this.makeChart(e, entity))
    },
  },

  mounted () {
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
