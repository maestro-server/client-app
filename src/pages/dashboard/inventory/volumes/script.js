'use strict'

import modalCreate from './modalCreate/create'
import Volumes from 'factories/volumes'

export default {
  components: {
    modalCreate
  },

  data() {
    return {
      entity: Volumes
    }
  }
}
