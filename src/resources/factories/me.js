'use strict'

import Factory from './factory'

class Me extends Factory {

  static ename = 'me'

  constructor(model= {}) {
    const ename = Me.ename
    super(model, ename)
    this.setName(ename)
  }
}

export default Me
