'use strict'

import axios from 'axios'
import api_url from 'src/resources/libs/api_url'
import store from 'src/store'
const req = (headers = {}, dtimeout) => {
  const timeout = dtimeout || _.get(store.getters, 'get_options.api_timeout')

  console.log()

  return axios.create({
    baseURL: api_url,
    timeout: timeout,
    headers
  })
}

export default req
