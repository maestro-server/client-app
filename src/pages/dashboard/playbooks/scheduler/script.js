'use strict'

import modalCreate from './modalCreate/create'
import Scheduler from 'factories/scheduler'

export default {
  components: {
    modalCreate
  },

  data() {
    return {
      entity: Scheduler
    }
  }
}
