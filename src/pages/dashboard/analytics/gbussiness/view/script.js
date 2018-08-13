'use strict'
import Graphs from 'factories/graphs'
import ViewSingle from 'mixins/view-single'

export default {
  mixins: [ViewSingle],

  data: function () {
    return {
      entity: Graphs,
      model: {}
    }
  }
}
