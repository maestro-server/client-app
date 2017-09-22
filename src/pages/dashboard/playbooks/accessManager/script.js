'use strict'
import modalCreate from './modalCreate/create'
import AccessManager from 'factories/accessManager'

export default {

  components: {
    modalCreate
  },

  data() {
    return {
      entity: AccessManager
    }
  }

}
