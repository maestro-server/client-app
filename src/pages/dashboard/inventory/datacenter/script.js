'use strict'

import modalCreate from './modalCreate/create'
import modalInstances from './modalInstances/create'
import Datacenters from 'factories/datacenters'

export default {
  components: {
    modalCreate,
    modalInstances
  },

  data() {
    return {
      entity: Datacenters
    }
  }
}
