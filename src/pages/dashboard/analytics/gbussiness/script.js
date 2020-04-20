'use strict'
import modalCreate from './modalCreate/create'
import Graphs from 'factories/graphs'

export default {

  components: {
    modalCreate
  },

  data () {
    return {
      entity: Graphs
    }
  }

}
