'use strict'

import Reports from 'factories/reports'
import ListBox from 'mixins/list-boxs'

export default {
  mixins: [ListBox],

  data: function () {
    return {
      entity: Reports,
      name: "Bussiness Graph",
    }
  }
}
