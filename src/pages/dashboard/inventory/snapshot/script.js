'use strict'

import modalCreate from './modalCreate/create'
import Snapshots from 'factories/snapshots'

export default {
  components: {
    modalCreate
  },

  data() {
    return {
      entity: Snapshots
    }
  }
}
