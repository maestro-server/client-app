'use strict'

import modalCreate from './modalCreate/create'
import modalMembers from './modalMembers/create'
import Clients from 'factories/clients'

export default {
  components: {
    modalCreate,
    modalMembers
  },

  data() {
    return {
      entity: Clients
    }
  }
}
