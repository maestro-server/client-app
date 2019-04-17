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
      entity: Datacenters,
      model: {},
      analytics: {
        servers: {},
        applications: {}
      }
    }
  },

  computed: {
    filtered() {
      return _.omit(this.model, ['owner', 'roles', '_links'])
    }
  },

  methods: {
    activateAnalytics() {
      const {_id} = this.model
      FectherEntity(Datacenters)({path: `/${_id}/analytics`}).create(this.finishReport, {_id})
    },

    finishReport(data) {
      this.finishJob(data);
    },

    updateAnalyticsInfo() {
      const reports = _.get(this.model, 'reports')
      if(reports) {

        _.forEach(reports, (report) => {
          FectherEntity(Reports)({force: true})
            .findOne((response) => {
              console.log(response)
            }, _.get(report, '_id'))
        })

      }
    }
  },

  created () {
    this.$on('finishFetchData', this.updateAnalyticsInfo)
  }
}
