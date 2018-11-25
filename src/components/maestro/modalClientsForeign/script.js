'use strict'

import Modals from 'mixins/modals'
import ModalsForeignRelation from 'mixins/modals-foreign-relation'

import Clients from 'factories/clients'
import System from 'factories/system'

import tabForeignRelation from 'src/pages/dashboard/_modules/tabs/tab_foreign-relation'

export default {
  mixins: [Modals, ModalsForeignRelation],

  components: {
    tabForeignRelation
  },

  computed: {
    tabRef() {
      return this.$refs.tab_foreign_relation
    }
  },

  data() {
    return {
      entity: Clients,
      relation: System,
      label: 'System',
      fielder: 'list_system'
    }
  }
}
