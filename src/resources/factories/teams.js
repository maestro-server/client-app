
import Factory from './factory'

class Users extends Factory {

  constructor(e="/teams") {
    super(e)
  }

  list (query={}, success) {

    this.get(query, success)
  }

}

export default Users
