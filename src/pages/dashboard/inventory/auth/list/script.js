'use strict'

import svTable from './table/table'
import ListTable from 'mixins/list-table'
import modalForeignRelation from 'components/maestro/modalServersForeign/create'


export default {
  mixins: [ListTable],

  components: {
    svTable
  },

  data: function () {
    return {
      name: "Auth"
    }
  }
}
