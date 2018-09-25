'use strict'

import Projects from 'factories/projects'
import ListBox from 'mixins/list-boxs'

export default {
  mixins: [ListBox],

  data: function () {
    return {
      entity: Projects,
      name: "Project",
    }
  }
}
