'use strict'

import Factory from './factory'

class Teams extends Factory {

  static ename = 'teams'

  constructor (model = {}) {
    const ename = Teams.ename
    super(model, ename)
    this.setName(ename)
  }
}

export default Teams
