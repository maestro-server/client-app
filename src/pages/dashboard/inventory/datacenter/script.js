'use strict'

import modalCreate from './modalCreate/create'
import modalInstances from './modalInstances/create'
import dcMenu from '../../_modules/dcMenu/menu.vue'
import Datacenters from 'factories/datacenters'

export default {
  components: {
    modalCreate,
    modalInstances,
    dcMenu
  },

  data() {
    return {
      entity: Datacenters
    }
  }
}
