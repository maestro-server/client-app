'use strict'
import axios from 'axios'

const req = (headers = {}) => {
  return axios.create({
    baseURL: API_URL,
    timeout: API_TIMEOUT,
    headers
  })
}

export default req
