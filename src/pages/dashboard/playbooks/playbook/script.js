'use strict'

import modalCreate from './modalCreate/create'
import Playbooks from 'factories/playbooks'

export default {
  components: {
    modalCreate
  },

  data() {
    return {
      entity: Playbooks
    }
  }
}
