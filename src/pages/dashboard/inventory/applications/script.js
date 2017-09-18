'use strict'

import modalCreate from './modalCreate/create'
import Applications from 'factories/applications'

export default {
  components: {
    modalCreate
  },

  data() {
    return {
      entity: Applications
    }
  }
}
