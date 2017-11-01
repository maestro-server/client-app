'use strict'
import axios from 'axios'

const req = (headers = {}, dtimeout) => {
  const timeout = dtimeout || API_URL
  return axios.create({
    baseURL: API_URL,
    timeout: timeout,
    headers
  })
}

export default req
