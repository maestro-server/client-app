'use strict'

import Graphs from 'factories/graphs'
import ListBox from 'mixins/list-boxs'

export default {
  mixins: [ListBox],

  data: function () {
    return {
      entity: Graphs,
      name: "Bussiness Graph",
    }
  }
}
