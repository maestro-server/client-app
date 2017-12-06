'use strict'

import Images from 'factories/images'
import dcMenu from '../../_modules/dcMenu/menu.vue'

export default {
  components: {
    dcMenu
  },

  data() {
    return {
      entity: Images
    }
  }
}
