'use strict'
import _ from 'lodash'

import Reports from 'factories/reports'
import VueTable from 'mixins/vue-table'
import ViewSingle from 'mixins/view-single'

export default {
  mixins: [VueTable, ViewSingle],

  data: function () {
    return {
      model: {},
      entity: Reports,
      columns: ['name', 'hostname', 'created_at', 'status', 'actions'],
      options: {
        filterable: ['name'],
        headings: {
          updated_at: 'Updated At',
          created_at: 'Created At'
        }
      }
    }
  },

  computed: {
    url() {
      if (_.has(this.model, '_id')) {
        return `${new this.entity().getUrl()}/${_.get(this.model, '_id')}/result`
      }
    }
  },

  methods: {
    prepared(data) {
      return data.map((d) => {
        d.updated_at = new Date(d.updated_at).toLocaleString()
        d.created_at = new Date(d.created_at).toLocaleString()
        return d
      })
    }
  }
}
