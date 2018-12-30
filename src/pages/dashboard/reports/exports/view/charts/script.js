'use strict'
import _ from 'lodash'

import Reports from 'factories/reports'
import ViewSingle from 'mixins/view-single'
import pieChart from 'components/charts/pie_chart.vue'
import doughnutChart from 'components/charts/doughnut_chart.vue'
import totalChart from 'components/charts/total_chart.vue'
import polarChart from 'components/charts/polar_chart.vue'
import barChart from 'components/charts/bar_chart.vue'
import charts from 'mixins/charts'

import {EventBus} from 'src/resources/bus/bus-general.js'


export default {
  mixins: [ViewSingle, charts],

  components: {
    pieChart,
    totalChart,
    doughnutChart,
    polarChart,
    barChart
  },

  data: function () {
    return {
      entity: Reports,
      model: {},
      charts: []
    }
  },

  methods: {
    makeCharts(data) {
      const {aggr} = data
      this.$set(this, 'charts', _.orderBy(aggr, ['opts.order']))
    },

    transfData(data) {
      const labels = _.chain(data)
        .get('aggr.label')
        .map(_.truncate)
        .value()

      return this.factoryData(
        labels,
        _.get(data, 'aggr.data'),
        _.get(data, 'opts.limit', 15),
      )
    },

    transfOptions(data) {
      return {
        legend: {
          display: _.get(data, 'opts.legend', true),
          position: _.get(data, 'opts.legendpos', 'right')
        },
        title: {
          display: true,
          text: _.get(data, 'opts.txt', "")
        },
        maintainAspectRatio: false,
      }
    },

    type(data) {
      return _.get(data, 'opts.ct', 'pie')
    },

    size(data) {
      return _.get(data, 'opts.size', 'col-sm-4')
    },

    updatePage() {
      this.$router.go()
    }
  },

  created() {
    this.$on('finishFetchData', this.makeCharts)
    EventBus.$on(`reports-${this.id}`, this.updatePage)
  },

  destroyed() {
    this.$off('finishFetchData', this.makeCharts)
    EventBus.$on(`reports-${this.id}`, this.updatePage)
  }
}
