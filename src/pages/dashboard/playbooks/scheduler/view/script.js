'use strict'
import _ from 'lodash'

import Scheduler from 'factories/scheduler'
import ViewSingle from 'mixins/view-single'

export default {
  mixins: [ViewSingle],

  data: function () {
    return {
      entity: Scheduler,
      model: {tags: []}
    }
  },

  computed: {
    MMembers() {
      return this.$parent.$refs.modal_members
    },
    filtered() {
      return _.omit(this.model, ['owner', 'roles', 'active', '_links'])
    }
  },

  methods: {}
}
