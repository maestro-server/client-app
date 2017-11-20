'use strict'

import axios from 'axios'
import api_url from 'src/resources/libs/api_url'
import api_timeout from 'src/resources/libs/api_timeout'

const req = (headers = {}, dtimeout) => {
  const timeout = dtimeout || api_timeout

  console.log()

  return axios.create({
    baseURL: api_url,
    timeout: timeout,
    headers
  })
}

export default req
