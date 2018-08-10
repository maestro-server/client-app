'use strict'

import modalCreate from './modalCreate/create'
import modalMysql from './modalMysql/create'
import modalOracle from './modalOracle/create'
import modalFamilyApps from 'components/maestro/modalFamilyApp/app'
import modalCreateChoose from './modalCreateChoose/create'
import Applications from 'factories/applications'

export default {
  components: {
    modalCreate,
    modalMysql,
    modalOracle,
    modalCreateChoose,
    modalFamilyApps
  },

  data() {
    return {
      entity: Applications
    }
  }
}
