'use strict'

import Factory from './factory'

class Me extends Factory {

  constructor(model={}, e="/me") {
    super(model, e)
  }
}

export default Me
