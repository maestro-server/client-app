
import Factory from './factory'

class Users extends Factory {

  constructor() {
    super()

    this.entity = '/users'
    return this
  }

  me (params) {
    this.entity = '/me'

    this
      .authorization()
      .get(params)
  }

}

export default Users
