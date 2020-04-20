'use strict'

import Factory from './factory'

class Providers extends Factory {

  static ename = 'providers'

  constructor(model={}, path='') {
    const ename = Providers.ename
    super(model, ename + path)
    this.setName(ename)
  }
}

export default Providers
