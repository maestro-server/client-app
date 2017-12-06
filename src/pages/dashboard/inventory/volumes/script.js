'use strict'

import modalCreate from './modalCreate/create'
import Volumes from 'factories/volumes'
import dcMenu from '../../_modules/dcMenu/menu.vue'

export default {
  components: {
    modalCreate,
    dcMenu
  },

  data() {
    return {
      entity: Volumes
    }
  }
}
