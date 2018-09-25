'use strict'
import modalCreate from './modalCreate/create'
import Projects from 'factories/projects'

export default {

  components: {
    modalCreate
  },

  data() {
    return {
      entity: Projects
    }
  }

}
