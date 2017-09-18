'use strict'

import Modals from 'mixins/modals'
import ModalsForeignRelation from 'mixins/modals-foreign-relation'

import Clients from 'factories/clients'

export default {
  mixins: [Modals, ModalsForeignRelation],

  data() {
    return {
      entity: Clients,
      relation: 'system',
      label: 'System',
      fielder: 'list_system'
    }
  }
}
