'use strict'
import _ from 'lodash'

import Network from 'factories/network'
import ViewSingle from 'mixins/view-single'

export default {
  mixins: [ViewSingle],

  data: function () {
    return {
      entity: Network,
      model: { tags: [] }
    }
  },

  computed: {
    MMembers () {
      return this.$parent.$refs.modal_members
    },
    filtered () {
      return _.omit(this.model, ['owner', 'roles', '_links'])
    }
  }
}
