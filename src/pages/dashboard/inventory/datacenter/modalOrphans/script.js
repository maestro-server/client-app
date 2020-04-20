'use strict'

import Modals from 'mixins/modals'
import svTable from './table/table'
import Servers from 'factories/servers'

export default {
  mixins: [Modals],

  components: {
    svTable
  },

  data: function () {
    return {
      entity: Servers
    }
  },

  computed: {
    MDelete () {
      return this.$refs.modal_delete_server
    }
  },

  methods: {
    afterShow () {
      this.text.title = `Orphans servers into ${this.model.name}`
    },

    deleteServer (data) {
      this.MDelete
        .onFinishCallBack(this.$refs.svTable.$refs.vTable.refresh)
        .show(data)
    }
  }

}
