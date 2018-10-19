'use strict'
import _ from 'lodash'

import flavorsPublic from 'factories/flavorsPublic'
import ViewSingle from 'mixins/view-single'

export default {
  mixins: [ViewSingle],

  data: function () {
    return {
      entity: flavorsPublic,
      model: {tags: [], datacenters: {}},
    }
  },

  computed: {
    MMembers() {
      return this.$parent.$refs.modal_members
    },
    filtered() {
      return _.omit(this.model, ['owner', 'roles', '_links'])
    }
  }
}
