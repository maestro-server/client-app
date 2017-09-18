'use strict'

import modalCreate from './modalCreate/create'
//import modalDelete from './modalDelete/delete'
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
