'use strict'
import _ from 'lodash'

import Graphs from 'factories/graphs'
import ViewSingle from 'mixins/view-single'

export default {
  mixins: [ViewSingle],

  data: function () {
    return {
      entity: Graphs,
      model: {name: null}
    }
  },

  computed: {
    typeStatus() {
      const mapp = {'finished': 'success', 'error': 'danger', 'process': 'warning'}
      return _.get(mapp, this.model.status, 'info')
    },

    filtered() {
      return _.omit(this.model, ['owner', 'roles', 'active', '_links', 'ifamilies', 'isystems', 'iclients', 'iservers', 'info.histograms'])
    }
  }
}
