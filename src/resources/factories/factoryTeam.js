'use strict'

import Factory from './factory'

class factoryTeam extends Factory {

  constructor(model={}, route="/projects") {
    super(model, route)

    if(this.isTeam()) {
      this.setEntity(`/teams/${this.model.team._id}${route}`)
    }
  }

  isTeam() {
    return _.has(this.model, 'team._id')
  }
}

export default factoryTeam
