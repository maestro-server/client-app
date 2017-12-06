'use strict'

import modalCreate from './modalCreate/create'
import Networks from 'factories/networks'
import dcMenu from '../../_modules/dcMenu/menu.vue'

export default {
  components: {
    modalCreate,
    dcMenu
  },

  data() {
    return {
      entity: Networks
    }
  }
}
