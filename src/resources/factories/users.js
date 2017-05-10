
import Factory from './factory'

class Users extends Factory {

  constructor() {
    super()

    this.entity = '/users'
    return this
  }

  me (params, success) {
    this.entity = '/me'

    this
      .authorization()
      .get(params, success)
  }

}

export default Users
