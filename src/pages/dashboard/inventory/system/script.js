'use strict'

import modalCreate from './modalCreate/create'
import modalMembers from './modalMembers/create'
import System from 'factories/system'

export default {
  components: {
    modalCreate,
    modalMembers
  },

  data() {
    return {
      entity: System
    }
  }
}
