'use strict'

import Factory from './factory'

class Adminer extends Factory {

  constructor(model={}) {
    super(model, "adminer")
  }
}

export default Adminer
