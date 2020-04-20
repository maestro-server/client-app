'use strict'

import Factory from './factory'

class Services extends Factory {

  static ename = 'services'

    constructor(model={}) {
    const ename = Services.ename
    super(model, ename)
    this.setName(ename)
  }
}

export default Services
