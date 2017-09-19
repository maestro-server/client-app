'use strict'

import Modals from 'mixins/modals'
import ModalsForeignRelation from 'mixins/modals-foreign-relation'

import Clients from 'factories/clients'
import System from 'factories/system'

export default {
  mixins: [Modals, ModalsForeignRelation],

  data() {
    return {
      entity: Clients,
      relation: System,
      label: 'System',
      fielder: 'list_system'
    }
  }
}
