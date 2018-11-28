'use strict'


import Applications from 'factories/applications'
import modalCreate from './modalCreate/create'
import modalDeps from 'components/maestro/modalDeps/deps'
import modalForeignRelation from 'components/maestro/modalServersForeign/create'

export default {
  components: {
    modalCreate,
    modalDeps,
    modalForeignRelation
  },

  data() {
    return {
      entity: Applications
    }
  }
}
