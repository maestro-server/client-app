
import Factory from './factory'

class Users extends Factory {

  constructor(e="/teams") {
    super(e)
  }

  list (success) {

    this.get({}, success)
  }

}

export default Users
