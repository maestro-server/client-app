'use strict'
import modalCreate from './modalCreate/create'
import Teams from 'factories/teams'

export default {

  components: {
    modalCreate
  },

  data () {
    return {
      entity: Teams
    }
  }

}
