'use strict'

import modalCreate from './modalCreate/create'
import Jobs from 'factories/jobs'

export default {
  components: {
    modalCreate
  },

  data() {
    return {
      entity: Jobs
    }
  }
}
