'use strict'

import Flavors from 'factories/flavors'
import dcMenu from '../../_modules/dcMenu/menu.vue'

export default {
  components: {
    dcMenu
  },

  data () {
    return {
      entity: Flavors
    }
  }
}
