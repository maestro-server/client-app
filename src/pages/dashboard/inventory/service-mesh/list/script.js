'use strict'

import svTable from './table/table'
import ListTable from 'mixins/list-table'


export default {
  mixins: [ListTable],

  components: {
    svTable
  },

  data: function () {
    return {
      name: "Service Mesh"
    }
  }
}
