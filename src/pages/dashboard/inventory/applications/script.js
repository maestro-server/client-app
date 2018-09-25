'use strict'

import modalCreate from './modalCreate/create'
import modalDeps from 'components/maestro/modalDeps/deps'
import Applications from 'factories/applications'

export default {
  components: {
    modalCreate,
    modalDeps
  },

  data() {
    return {
      entity: Applications
    }
  }
}
