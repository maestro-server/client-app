'use strict'

import modalCreate from './modalCreate/create'
import modalFamilyApps from 'components/maestro/modalFamilyApp/app'
import Applications from 'factories/applications'

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
