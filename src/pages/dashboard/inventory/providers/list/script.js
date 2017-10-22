'use strict'

import Providers from 'factories/providers'
import ListBox from 'mixins/list-boxs'

export default {
  mixins: [ListBox],

  data: function () {
    return {
      entity: Providers,
      name: "Connection",
    }
  }
}
