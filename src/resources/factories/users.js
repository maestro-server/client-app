'use strict'

import Factory from './factory'

class Users extends Factory {

  constructor(model={}) {
    super(model, "/users")
  }

}

export default Users
