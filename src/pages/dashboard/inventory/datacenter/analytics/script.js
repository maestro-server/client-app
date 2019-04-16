'use strict'
import _ from 'lodash'
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
      FectherEntity(Datacenters)({path: `/${_id}/analytics`}).create(this.finishReport, {_id})
    },

    finishReport(data) {
      console.log(data)
    }
  }
}
