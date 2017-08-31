'use strict'
import axios from 'axios'

export default function(headers={}) {

  return axios.create({
    baseURL: API_URL,
    timeout: API_TIMEOUT,
    headers
  })

}
