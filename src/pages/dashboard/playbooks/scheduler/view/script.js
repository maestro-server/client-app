'use strict'
import _ from 'lodash'

import Scheduler from 'factories/scheduler'
import Events from 'factories/events'
import ViewSingle from 'mixins/view-single'
import FectherEntity from 'services/fetchEntity'

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
    },
    viewDisplayer() {
      return [
        {val: _.get(this.model, 'enabled') ? "Active" : "Disabled", type: _.get(this.model, 'enabled') ? "success" : "danger"},
        {val: _.get(this.model, 'period_type')},
        {val: _.get(this.model, 'task')},
        {val: _.get(this.model, 'total_run_count', 0)}
      ]
    }
  },

  methods: {
    fetchEvents() {
      const filter = {
        'event': _.get(this.model, '_id')
      }

      FectherEntity(Events)({force: true})
        .find(this.prepareEvents, filter)
    },

    prepareEvents(events) {
      console.log(events)
    }
  },

  created() {
    this.$on('finishFetchData', this.fetchEvents)
  }
}
