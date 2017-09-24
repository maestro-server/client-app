'use strict'

import modalCreate from './modalCreate/create'
import Reports from 'factories/reports'

export default {
  components: {
    modalCreate
  },

  data() {
    return {
      entity: Reports
    }
  }
}
