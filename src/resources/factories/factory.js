'use strict'

import DRequester from '../requests/request'
import store from 'src/store'

import fsuccess from '../callbacks/request_success'
import frejected from '../callbacks/request_rejected'

import Login from 'services/login'
import api_url from 'src/resources/libs/api_url'

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

  getUrl(path=api_url) {
    return `${path}/${this.entity}`
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
    Object.assign(this.header, objs)
    return this
  }

  getID (id, success=fsuccess) {
    this.setEntity(`${this.entity}/${id}`)
    this.get(success)
  }

  get (call_success = fsuccess, call_rejected = frejected) {
    const params = this.model
    this.factoryRequest('get', {params}, call_success, call_rejected)
  }

  create (call_success = fsuccess, call_rejected = frejected) {
    this.factoryRequest('post', this.model, call_success, call_rejected)
  }

  updateID (id, call_success = fsuccess, call_rejected = frejected) {
    this.setEntity(`${this.entity}/${id}`)
    this.update(call_success, call_rejected)
  }

  update (call_success = fsuccess, call_rejected = frejected) {
    this.factoryRequest('put', this.model, call_success, call_rejected)
  }

  patchID (id, call_success = fsuccess) {
    this.setEntity(`${this.entity}/${id}`)
    this.patch(call_success)
  }

  patch (call_success = fsuccess, call_rejected = frejected) {
    this.factoryRequest('patch', this.model, call_success, call_rejected)
  }

  deleteID (id, success=fsuccess) {
    this.setEntity(`${this.entity}/${id}`)
    this.delete(success)
  }

  delete (call_success = fsuccess, call_rejected = frejected) {
    const data = this.model
    this.factoryRequest('delete', {data}, call_success, call_rejected)
  }

  factoryRequest (caller, args, call_success, call_rejected) {
    store.dispatch('onSpinner')

    this.requester(this.header, this.timeout)[caller](this.entity, args)
      .then((e) => this.finishCallback(e, call_success))
      .catch((e) => this.finishCallback(e, call_rejected))
  }

  finishCallback (e, callback) {
    store.dispatch('offSpinner')
    callback(e)
  }

}

export default Factory
