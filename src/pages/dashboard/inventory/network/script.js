'use strict'

import modalCreate from './modalCreate/create'
import Networks from 'factories/networks'

export default {
  components: {
    modalCreate
  },

  data() {
    return {
      entity: Networks
    }
  }
}
