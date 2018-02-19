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
      options: {
        listColumns: {
          status: [{text: 'Active'}, {text: 'Avaliable'}, {text: 'Stopped'}]
        },
        filterable: ['status', 'name', 'hostname', 'environment', 'ipv4_private', 'ipv4_public', 'family', 'servers', 'role', 'language', 'deploy', 'contacts', 'provider', '_id', 'region', 'zone', 'type', 'instance', 'instance_id', 'subnet_id', 'tags'],
        headings: {
          created_at: 'Created At'
        },
        perPage: 50,
        perPageValues: [50, 100, 200, 400, 800, 1600]
      }
    }
  },

  computed: {
    MSingle() {
      return this.$refs.modal_single
    },

    columns() {
      if (_.has(this.model, '_id')) {
        this.model.columns.unshift('-')
        return this.model.columns || ['-', 'active', 'name', 'hostname', 'created_at', 'status']
      }
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
    },

    tinyFilter(data) {
      if (_.has(this, 'options.filterable'))
        return _.pick(data, this.options.filterable)
    }
  }
}

