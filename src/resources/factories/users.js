
import Requester from '../requests/request'

class Users {

  constructor() {
    this.entity = '/users'
    return this
  }

  create (data) {

    return Requester.post(this.entity, data)
      .then((e) => console.log(e))
  }

}

export default Users
