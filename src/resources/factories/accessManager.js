'use strict'

import Factory from './factory'

class AccessManager extends Factory {

  constructor(model={}) {
    super(model, "access_manager")
  }
}

export default AccessManager
