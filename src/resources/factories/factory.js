
import Requester from '../requests/request'

import fsuccess from '../callbacks/request_success'
import frejected from '../callbacks/request_rejected'

class Factory {

  create (data, call_success = fsuccess, call_rejected = frejected) {
    Requester
      .post(this.entity, data)
      .then(call_success)
      .catch(call_rejected)
  }

}

export default Factory
