'use strict'
import _ from 'lodash'
import Reports from 'factories/reports'
import Scheduler from 'factories/scheduler'
import Datacenters from 'factories/datacenters'
import ViewSingle from 'mixins/view-single'
import FectherEntity from 'services/fetchEntity'

export default {
  mixins: [ViewSingle],

  data: function () {
    return {
      entity: Datacenters,
      model: {}
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
      const report = "general"
      const filters = [{ field: "active", filter: "true", comparer: "equal", typ: "boolean" }]
      const common = {report, filters}

      const reports = [
        {
          name:`DC ${this.model.name} - Server`,
          component: "Servers"
        },
        {
          name:`DC ${this.model.name} - Apps`,
          component: "Applications",
        }
      ]

      _.forEach(
        reports,
        (post) => FectherEntity(Reports)().create(this.finishReport, _.assign(post, common))
      )
    },

    finishReport(data) {
      console.log(data)
    }
  }
}
