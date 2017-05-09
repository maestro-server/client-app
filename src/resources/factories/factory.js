
import Requester from '../requests/request'

import fsuccess from '../callbacks/request_success'
import frejected from '../callbacks/request_rejected'

class Factory {

  constructor () {

    this.header = {}
  }

  headers (objs) {

    this.header = objs
    return this
  }

  get (params={}, call_success = fsuccess, call_rejected = frejected) {

    Requester
      .get(this.entity, {params}, this.header)
      .then(call_success)
      .catch(call_rejected)
  }

  create (data={}, call_success = fsuccess, call_rejected = frejected) {

    Requester
      .post(this.entity, data, this.header)
      .then(call_success)
      .catch(call_rejected)
  }

}

export default Factory
