'use strict'

import modalCreate from './modalCreate/create'
import Applications from 'factories/applications'
import modalForeignRelation from 'components/maestro/modalServersForeign/create'

export default {
  components: {
    modalCreate,
    modalForeignRelation
  },

  data () {
    return {
      entity: Applications
    }
  }
}
