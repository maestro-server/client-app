'use strict'

import modalCreate from './modalCreate/create'
import Applications from 'factories/applications'
import modalFamilyApps from 'components/maestro/modalFamilyApp/app'

export default {
  components: {
    modalCreate,
    modalFamilyApps
  },

  data() {
    return {
      entity: Applications
    }
  }
}
