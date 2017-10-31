'use strict'

import DRequester from '../requests/request'
import store from 'src/store'

import fsuccess from '../callbacks/request_success'
import frejected from '../callbacks/request_rejected'

import Login from 'services/login'

class Factory {

  constructor (model={}, e, Requester = DRequester) {
    this.entity = e
    this.header = {}
    this.model =  model

    this.requester = Requester
  }

  getName() {
    return this.constructor.name.toLowerCase()
  }

  getUrl(path=API_URL) {
    return `${path}${this.entity}`
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

  getID (id, success=fsuccess) {
    this.setEntity(`${this.entity}/${id}`)
    this.get(success)
  }

  get (call_success = fsuccess) {
    const params = this.model
    this.factoryRequest('get', {params}, call_success)
  }

  create (call_success = fsuccess) {
    this.factoryRequest('post', this.model, call_success)
  }

  updateID (id, call_success = fsuccess) {
    this.setEntity(`${this.entity}/${id}`)
    this.update(call_success)
  }

  update (call_success = fsuccess) {
    this.factoryRequest('put', this.model, call_success)
  }

  patchID (id, call_success = fsuccess) {
    this.setEntity(`${this.entity}/${id}`)
    this.patch(call_success)
  }

  patch (call_success = fsuccess) {
    this.factoryRequest('patch', this.model, call_success)
  }

  deleteID (id, success=fsuccess) {
    this.setEntity(`${this.entity}/${id}`)
    this.delete(success)
  }

  delete (call_success = fsuccess) {
    const data = this.model
    this.factoryRequest('delete', {data}, call_success)
  }

  factoryRequest (caller, args, call_success, call_rejected = frejected) {
    store.dispatch('onSpinner')

    this.requester(this.header)[caller](this.entity, args)
      .then((e) => this.finishCallback(e, call_success))
      .catch((e) => this.finishCallback(e, call_rejected))
  }

  finishCallback (e, callback) {
    store.dispatch('offSpinner')
    callback(e)
  }

}

export default Factory
