'use strict'
import _ from 'lodash'

import Reports from 'factories/reports'
import ViewSingle from 'mixins/view-single'
import SingleReport from 'mixins/single-report'

export default {
  mixins: [ViewSingle, SingleReport],

  data: function () {
    return {
      entity: Reports,
      model: {tags: []}
    }
  },

  computed: {
    typeStatus() {
      const mapp = {'finished': 'success', 'error': 'danger', 'process': 'warning'}
      return _.get(mapp, this.model.status, 'info')
    },

    filtered() {
      return _.omit(this.model, ['owner', 'roles', 'active', '_links'])
    }
  }
}
