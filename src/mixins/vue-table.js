'use strict'

import _ from 'lodash'
import Login from 'services/login'
import formatAdminer from 'src/resources/libs/formatAdminerData'

export default {
  data: function () {
    return {
      options: {
        headers: { Authorization: Login.Authorization() },
        responseAdapter: (resp) => ({
          data: this.prepared(_.get(resp, 'data.items', [])),
          count: _.get(resp, 'data.found', 0)
        }
        )
      }
    }
  },

  computed: {
    url () {
      return this.entity.getUrl()
    }
  },

  methods: {
    viewReducer (old, obj, key, fielder) {
      const str = key > 0 ? "|" : ""
      return `${old} ${str} ${obj[fielder]}`;
    },

    editP (data) {
      this.$parent.editE(data)
    },

    deleteP (data) {
      this.$parent.deleteE(data)
    },

    fetchAdminer (e) {
      const data = formatAdminer(e)
      _.forEach(
        this.options.listColumns,
        (val, key) => this.fetchData(key, key)(data, '')
      )
    },

    fetchData (opt, fielder = 'data.items') {
      return (result, getter = 'name') => {
        const data = _.get(result, fielder)
        if (!_.isEmpty(data)) {
          this.options.listColumns[opt] = data.map(item => ({ text: _.get(item, getter, item) }))
        }
      }
    }
  }
}
