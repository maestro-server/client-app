'use strict'
import caxios from './caxios'
import store from 'src/store'

const req = () => {

  store.dispatch('onSpinner')

  return {
    get: (entity, data={}, headers={}) => {
      return caxios(headers)
        .get(entity, data)
    },

    post: (entity, data={}, headers={}) => {
      return caxios(headers)
        .post(entity, data)
    },

    put: (entity, data={}, headers={}) => {
      return caxios(headers)
        .put(entity, data)
    },

    patch: (entity, data={}, headers={}) => {
      return caxios(headers)
        .patch(entity, data)
    },

    delete: (entity, data={}, headers={}) => {
      return caxios(headers)
        .delete(entity, {data})
    }
  }

}

export default req
