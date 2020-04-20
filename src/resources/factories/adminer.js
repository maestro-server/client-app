'use strict'

import Factory from './factory'

class Adminer extends Factory {

  static ename = "adminer"

  constructor (model = {}) {
    super(model, Adminer.ename)
  }
}

export default Adminer
