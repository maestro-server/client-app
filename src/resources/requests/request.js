import caxios from './caxios'

const req = {
  get: () => {

  },

  post: (entity, data) => {
    return caxios().post(entity, data)
  },

  patch: () => {

  }

}

export default req
