'use strict'

import modalCreate from './modalCreate/create'
import Servers from 'factories/servers'
import modalFamilyApps from 'components/maestro/modalFamilyApp/app'


export default {
  components: {
    modalCreate,
    modalFamilyApps
  },

  data() {
    return {
      entity: Servers
    }
  }
}
