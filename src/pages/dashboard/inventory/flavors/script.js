'use strict'

import modalCreate from './modalCreate/create'
import Flavors from 'factories/flavors'
import dcMenu from '../../_modules/dcMenu/menu.vue'

export default {
  components: {
    modalCreate,
    dcMenu
  },

  data() {
    return {
      entity: Flavors
    }
  }
}
