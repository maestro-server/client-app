'use strict'

import Factory from './factory'

class Providers extends Factory {

  constructor(model={}, path='') {
    super(model, "providers"+path)
  }
}

export default Providers
