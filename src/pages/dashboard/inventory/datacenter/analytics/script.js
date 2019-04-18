'use strict'
import _ from 'lodash'
import Datacenters from 'factories/datacenters'
import ViewSingle from 'mixins/view-single'
import FectherEntity from 'services/fetchEntity'
import charts from 'mixins/charts'
import pieChart from 'components/charts/pie_chart.vue'
import doughnutChart from 'components/charts/doughnut_chart.vue'
import totalChart from 'components/charts/total_chart.vue'
import polarChart from 'components/charts/polar_chart.vue'
import barChart from 'components/charts/bar_chart.vue'
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
      entity: Datacenters,
      model: {},
      waitMessage: false
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
      if(data.status <= 300) {
        this.showMessage()
        this.waitComplete(_.get(data, 'data[0].reports[0]._id'))
        this.$set(this.model, 'reports', _.get(data, 'data[0].reports'))
      }
    },

    finishReportUpdate(data) {
      if(data.status <= 300) {
        this.showMessage()
        console.log(data)
        this.waitComplete(_.get(data, 'data._id'))
      }
    },

    showMessage() {
      this.waitMessage = true
    },

    waitComplete(id) {
      console.log(id)
      EventBus.$on(`reports-${id}`, this.updatePage)
    }
  }
}
