
import Factory from './factory'
import {Authorization} from 'services/getToken'

class Users extends Factory {

  constructor() {
    super()

    this.entity = '/users'
    return this
  }

  me (params) {

    this.entity = '/me'

    this.headers({Authorization})
      .get(params)
  }

}

export default Users
