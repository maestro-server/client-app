'use strict'

import AccessManager from 'factories/accessManager'
import ListBox from 'mixins/list-boxs'

export default {
  mixins: [ListBox],

  data: function () {
    return {
      entity: AccessManager,
      name: "Key",
    }
  }
}
