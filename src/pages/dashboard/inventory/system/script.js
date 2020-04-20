'use strict'

import modalCreate from './modalCreate/create'
import modalForeignRelation from 'components/maestro/modalSystemForeign/create'
import System from 'factories/system'

export default {
  components: {
    modalCreate,
    modalForeignRelation
  },

  data () {
    return {
      entity: System
    }
  }
}
