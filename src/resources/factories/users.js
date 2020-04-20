'use strict'

import Factory from './factory'

class Users extends Factory {

  static ename = 'users'

  constructor(model={}) {
    const ename = Users.ename
    super(model, ename)
    this.setName(ename)
  }

}

export default Users
