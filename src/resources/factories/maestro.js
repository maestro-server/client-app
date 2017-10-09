'use strict'

import Factory from './factory'

class Maestro extends Factory {

  constructor(model={}) {
    super(model, "/")
  }
}

export default Maestro
