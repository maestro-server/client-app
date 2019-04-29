'use strict'

import _ from 'lodash'
import Datacenters from 'factories/datacenters'
import Reports from 'factories/reports'
import ViewSingle from 'mixins/view-single'
import FectherEntity from 'services/fetchEntity'
import charts from 'mixins/charts'
import pieChart from 'components/charts/pie_chart.vue'
import doughnutChart from 'components/charts/doughnut_chart.vue'
import totalChart from 'components/charts/total_chart.vue'
import polarChart from 'components/charts/polar_chart.vue'
import barChart from 'components/charts/bar_chart.vue'
import formatDate from 'mixins/formatDate'

export default {
  mixins: [ViewSingle, charts, formatDate],

  components: {
    pieChart,
    totalChart,
    doughnutChart,
    polarChart,
    barChart
  },

  data: function () {
    return {
      entity: Datacenters,
      model: {},
      report: {},
      charts: [],
      component: 'Applications'
    }
  },

  computed: {
    filtered() {
      return _.omit(this.model, ['owner', 'roles', '_links'])
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

    activateAnalytics() {
      const {_id} = this.model
      FectherEntity(Datacenters)({path: `/${_id}/analytics`}).create(this.finishReport, {_id})
    },

    finishReport(data) {
      if(data.status == 200) {
        this.updateAnalyticsInfo();
      }
    },

    updateAnalyticsInfo() {
      const reports = _.get(this.model, 'reports')
      const report = _.chain(reports)
        .filter((a) => a.component==this.component)
        .head()
        .value()

      if(report) {
        const id= _.get(report, '_id')

        FectherEntity(Reports)({force: true})
          .findOne((response) => {
            let kre = _.chain(response)
              .get('data', {})
              .value()

            this.$set(this, 'report', kre)
            this.makeCharts(kre)
          }, id);
      }
    },

    isEmpty(arr) {
      return _.isEmpty(arr)
    },

    updateAnalytics() {
      FectherEntity(Reports)()
        .update(this.$parent.finishReportUpdate, this.report)
    }
  },

  created () {
    this.$on('finishFetchData', this.updateAnalyticsInfo)
  }
}
