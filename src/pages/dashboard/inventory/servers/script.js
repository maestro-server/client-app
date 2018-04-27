'use strict'

import modalCreate from './modalCreate/create'
import Servers from 'factories/servers'
import dcMenu from '../../_modules/dcMenu/menu.vue'

export default {
  components: {
    modalCreate,
    dcMenu
  },

  data() {
    return {
      entity: Servers
    }
  }
}
