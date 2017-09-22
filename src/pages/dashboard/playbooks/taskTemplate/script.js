'use strict'

import modalCreate from './modalCreate/create'
import TaskTemplate from 'factories/taskTemplate'

export default {
  components: {
    modalCreate
  },

  data() {
    return {
      entity: TaskTemplate
    }
  }
}
