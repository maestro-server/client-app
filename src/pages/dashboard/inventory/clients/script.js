'use strict'

import modalCreate from './modalCreate/create'
import Clients from 'factories/clients'
import modalForeignRelation from 'components/maestro/modalClientsForeign/create'

export default {
  components: {
    modalCreate,
    modalForeignRelation
  },

  data () {
    return {
      entity: Clients
    }
  }
}
