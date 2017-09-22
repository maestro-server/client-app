'use strict'

import modalCreate from './modalCreate/create'
import Servers from 'factories/servers'

export default {
  components: {
    modalCreate
  },

  data() {
    return {
      entity: Servers
    }
  }
}
