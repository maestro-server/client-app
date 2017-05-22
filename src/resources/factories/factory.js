
import Requester from '../requests/request'

import fsuccess from '../callbacks/request_success'
import frejected from '../callbacks/request_rejected'

import Login from 'services/login'

class Factory {

  constructor (e) {
    this.entity = e
    this.header = {}
  }

  authorization () {
    const Authorization = Login.Authorization()
    this.headers({Authorization})
    return this
  }

  headers (objs) {
    this.header = objs
    return this
  }

  list (query={}, success = fsuccess) {
    this.get(query, success)
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

  update (data={}, call_success = fsuccess, call_rejected = frejected) {
    Requester
      .put(this.entity, data, this.header)
      .then(call_success)
      .catch(call_rejected)
  }

  patchID (id, data, success=fsuccess) {
    this.entity += "/"+id
    this.patch(data, success)
  }

  patch (data={}, call_success = fsuccess, call_rejected = frejected) {
    Requester
      .patch(this.entity, data, this.header)
      .then(call_success)
      .catch(call_rejected)
  }

  deleteID (id, success=fsuccess) {
    this.entity += "/"+id
    this.delete({}, success)
  }

  delete (data={}, call_success = fsuccess, call_rejected = frejected) {
    Requester
      .delete(this.entity, data, this.header)
      .then(call_success)
      .catch(call_rejected)
  }

}

export default Factory
