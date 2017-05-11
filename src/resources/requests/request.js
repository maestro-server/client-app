import caxios from './caxios'

const req = {

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
      .delete(entity, data, headers)
  }

}

export default req
