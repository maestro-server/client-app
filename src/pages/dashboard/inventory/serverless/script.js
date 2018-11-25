'use strict'

import modalCreate from './modalCreate/create'
import Applications from 'factories/applications'
import modalFamilyApps from 'components/maestro/modalFamilyApp/app'
import modalForeignRelation from 'components/maestro/modalServersForeign/create'

export default {
  components: {
    modalCreate,
    modalFamilyApps,
    modalForeignRelation
  },

  data() {
    return {
      entity: Applications
    }
  }
}
