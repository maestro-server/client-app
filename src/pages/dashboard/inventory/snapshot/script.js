'use strict'

import modalCreate from './modalCreate/create'
import Snapshots from 'factories/snapshots'
import dcMenu from '../../_modules/dcMenu/menu.vue'

export default {
  components: {
    modalCreate,
    dcMenu
  },

  data() {
    return {
      entity: Snapshots
    }
  }
}
