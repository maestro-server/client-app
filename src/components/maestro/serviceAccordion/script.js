'use strict'

import SingleService from 'mixins/single-service'
export default {
  mixins: [SingleService],

  props: {
    data: {},
    provider: {}
  }
}
