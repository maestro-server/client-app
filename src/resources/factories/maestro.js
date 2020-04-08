'use strict'

import Factory from './factory'

class Maestro extends Factory {

  constructor(model={}, path='/') {
    super(model, path)
  }
}

export default Maestro
