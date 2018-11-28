'use strict'

import Modals from 'mixins/modals'
import ModalsForeignRelation from 'mixins/modals-foreign-relation'

import Servers from 'factories/servers'
import Applications from 'factories/applications'

import tabServers from 'src/pages/dashboard/_modules/tabs/tab_servers'


export default {
  mixins: [Modals, ModalsForeignRelation],

  components: {
    tabServers
  },

  computed: {
    tabRef() {return this.$refs.tab_servers}
  },

  data() {
    return {
      entity: Applications,
      relation: Servers,
      fielder: 'list_servers',
      type: "Servers"
    }
  },

  methods: {
    transformValue(val) {
      this.$set(this, 'value', val)
    }
  }

}
