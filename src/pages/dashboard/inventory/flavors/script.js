'use strict'

import modalCreate from './modalCreate/create'
import Flavors from 'factories/flavors'

export default {
  components: {
    modalCreate
  },

  data() {
    return {
      entity: Flavors
    }
  }
}
