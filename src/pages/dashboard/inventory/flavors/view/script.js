'use strict'
import _ from 'lodash'

import Flavors from 'factories/flavors'
import ViewSingle from 'mixins/view-single'

export default {
  mixins: [ViewSingle],

  data: function () {
    return {
      entity: Flavors,
      model: {tags: [], datacenters: {}},
    }
  },

  computed: {
    MMembers() {
      return this.$parent.$refs.modal_members
    },
    filtered() {
      return _.omit(this.model, ['owner', 'roles', 'active', '_links'])
    }
  }
}
