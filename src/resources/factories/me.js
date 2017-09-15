'use strict'

import Factory from './factory'

class Me extends Factory {

  constructor(model={}) {
    super(model, "me")
  }
}

export default Me
