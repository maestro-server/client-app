'use strict'

import modalCreate from './modalCreate/create'
import Events from 'factories/events'

export default {
  components: {
    modalCreate
  },

  data() {
    return {
      entity: Events
    }
  }
}
