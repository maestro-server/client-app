import caxios from './caxios'

const req = {

  get: (entity, data={}, headers={}) => {

    console.log(headers)

    return caxios(headers)
      .get(entity, data)
  },

  post: (entity, data={}, headers={}) => {

    return caxios(headers)
      .post(entity, data)
  },

  patch: () => {

  }

}

export default req
