'use strict'

import Services from 'factories/services'
import VueTable from 'mixins/vue-table'

export default {
  mixins: [VueTable],

  data: function () {
    return {
      entity: new Services(),
      columns: ['name', 'lfamily', 'ltags', 'actions'],
      options: {
        filterable: ['name'],
        headings: {
          lfamily: "Family",
          ltags: 'Tags'
        }
      }
    }
  },

  methods: {
    prepared(data) {
      return data.map((d) => {
        d.lfamily = _.reduce(d.family, (o, f) => `${o} ${f}`, "")
        d.ltags = _.reduce(d.tags, (o, f) => `${o} ${f}`, "")
        return d
      })
    }
  }
}
