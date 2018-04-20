'use strict'

import Scheduler from 'factories/scheduler'
import VueTable from 'mixins/vue-table'
import Adminer from 'factories/adminer'
import FectherEntity from 'services/fetchEntity'

export default {
  mixins: [VueTable],

  data: function () {
    return {
      entity: new Scheduler(),
      columns: ['enabled', 'name' ,'modules', 'period_type', 'total_run_count', 'created_at', 'actions'],
      options: {
        filterable: ['name', 'modules', 'period_type'],
        listColumns: {
          period_type: [],
          modules: []
        },
        headings: {
          updated_at: 'Updated At',
          created_at: 'Created At'
        }
      }
    }
  },

  methods: {
    prepared(data) {
      return data.map((d) => {
        d.modules = _.get(d, 'link.refs')
        d.updated_at = new Date(d.updated_at).toLocaleString()
        d.created_at = new Date(d.created_at).toLocaleString()
        return d
      })
    }
  },

  created() {
    FectherEntity(Adminer)({persistence: 'local'})
      .find(this.fetchAdminer, {key: 'scheduler_options'})
  }
}
