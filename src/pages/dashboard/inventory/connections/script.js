'use strict'
import modalCreate from './modalCreate/create'
import Connections from 'factories/connections'

export default {

  components: {
    modalCreate
  },

  data() {
    return {
      entity: Connections
    }
  }

}
