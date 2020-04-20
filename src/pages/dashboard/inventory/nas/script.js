'use strict'

import Applications from 'factories/applications'
import modalCreate from './modalCreate/create'
import modalFamilyApps from 'components/maestro/modalFamilyApp/app'
import modalForeignRelation from 'components/maestro/modalServersForeign/create'

export default {
  components: {
    modalCreate,
    modalFamilyApps,
    modalForeignRelation
  },

  data () {
    return {
      entity: Applications
    }
  }
}
