'use strict'

import modalCreate from './modalCreate/create'
import modalForeignRelation from './modalForeignRel/create'
import Clients from 'factories/clients'

export default {
  components: {
    modalCreate,
    modalForeignRelation
  },

  data() {
    return {
      entity: Clients
    }
  }
}
