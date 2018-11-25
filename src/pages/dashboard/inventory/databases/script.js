'use strict'

import modalCreate from './modalCreate/create'
import modalMysql from './modalMysql/create'
import modalOracle from './modalOracle/create'
import modalCreateChoose from './modalCreateChoose/create'
import Applications from 'factories/applications'
import modalFamilyApps from 'components/maestro/modalFamilyApp/app'
import modalForeignRelation from 'components/maestro/modalServersForeign/create'

export default {
  components: {
    modalCreate,
    modalMysql,
    modalOracle,
    modalCreateChoose,
    modalFamilyApps,
    modalForeignRelation
  },

  data() {
    return {
      entity: Applications
    }
  }
}
