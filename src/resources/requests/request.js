import caxios from './caxios'

const req = {
  get: (entity) => {
    return caxios().get(entity)
  },

  post: (entity, data) => {
    return caxios().post(entity, data)
  },

  patch: () => {

  }

}

export default req
