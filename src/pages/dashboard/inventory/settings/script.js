'use strict'

import modalCreate from './modalCreate/create'
import modalOptions from './modalOptions/create'
import Services from 'factories/services'

export default {
  components: {
    modalCreate,
    modalOptions
  },

  data() {
    return {
      entity: Services
    }
  }
}
