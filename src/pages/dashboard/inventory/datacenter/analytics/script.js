'use strict'
import _ from 'lodash'

import Datacenters from 'factories/datacenters'


import ViewSingle from 'mixins/view-single'

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
  }
}
