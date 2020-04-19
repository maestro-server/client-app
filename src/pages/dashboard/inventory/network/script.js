'use strict'

import modalCreate from './modalCreate/create'
import Network from 'factories/network'
import dcMenu from '../../_modules/dcMenu/menu.vue'

export default {
  components: {
    modalCreate,
    dcMenu
  },

  data() {
    return {
      entity: Network
    }
  }
}
