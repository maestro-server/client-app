'use strict'

import Factory from './factory'

class Teams extends Factory {

  constructor(model={}) {
    super(model, "/teams")
  }
}

export default Teams
