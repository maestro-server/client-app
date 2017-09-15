'use strict'

import Requester from '../requests/request'
import store from 'src/store'

import fsuccess from '../callbacks/request_success'
import frejected from '../callbacks/request_rejected'

import Login from 'services/login'

class Factory {

  constructor (model={}, e) {
    this.entity = e
    this.header = {}
    this.model =  model
  }

  getName() {
    return this.constructor.name.toLowerCase()
  }

  getUrl() {
    return this.entity
  }

  setEntity(e) {
    this.entity = e
    return this
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

  list (success = fsuccess) {
    this.get(success)
  }

  getID (id, success=fsuccess) {
    this.entity += "/"+id
    this.get(success)
  }

  get (call_success = fsuccess, call_rejected = frejected) {
    const params = this.model

    Requester()
      .get(this.entity, {params}, this.header)
      .then((e) => this.finishCallback(e, call_success))
      .catch((e) => this.finishCallback(e, call_rejected))
  }

  create (call_success = fsuccess, call_rejected = frejected) {
    Requester()
      .post(this.entity, this.model, this.header)
      .then((e) => this.finishCallback(e, call_success))
      .catch((e) => this.finishCallback(e, call_rejected))
  }

  update (call_success = fsuccess, call_rejected = frejected) {
    Requester()
      .put(this.entity, this.model, this.header)
      .then((e) => this.finishCallback(e, call_success))
      .catch((e) => this.finishCallback(e, call_rejected))
  }

  patchID (id, call_success = fsuccess) {
    this.entity += "/"+id
    this.patch(call_success)
  }

  patch (call_success = fsuccess, call_rejected = frejected) {
    Requester()
      .patch(this.entity, this.model, this.header)
      .then((e) => this.finishCallback(e, call_success))
      .catch((e) => this.finishCallback(e, call_rejected))
  }

  deleteID (id, success=fsuccess) {
    this.entity += "/"+id
    this.delete(success)
  }

  delete (call_success = fsuccess, call_rejected = frejected) {
    Requester()
      .delete(this.entity, this.model, this.header)
      .then((e) => this.finishCallback(e, call_success))
      .catch((e) => this.finishCallback(e, call_rejected))
  }

  finishCallback (e, callback) {
    store.dispatch('offSpinner')
    callback(e)
  }

}

export default Factory
