'use strict'
import _ from 'lodash'

import Reports from 'factories/reports'
import VueTable from 'mixins/vue-table'
import ViewSingle from 'mixins/view-single'
import SingleReport from 'mixins/single-report'

import modalSingle from './modalSingle/single'

export default {
  mixins: [VueTable, ViewSingle, SingleReport],

  components: {
    modalSingle
  },

  data: function () {
    return {
      model: {},
      entity: Reports,
      columns: ['active', 'name', 'hostname', 'created_at', 'status', '-'],
      options: {
        sortable: [],
        filterable: false,
        headings: {
          updated_at: 'Updated At',
          created_at: 'Created At'
        },
        perPage: 200,
        perPageValues: [200, 400, 600, 800, 1000, 1500, 2000, 3000]
      }
    }
  },

  computed: {
    MSingle() {
      return this.$refs.modal_single
    },

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
    },

    singleE: function (data) {
      this.MSingle
        .show(data)
    }
  }
}
