'use strict'
import modalCreate from './modalCreate/create'
import Providers from 'factories/providers'

export default {

  components: {
    modalCreate
  },

  data() {
    return {
      entity: Providers
    }
  }

}
