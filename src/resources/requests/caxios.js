'use strict'
import axios from 'axios'
import {TIMEOUT} from 'config/api.env'

export default function(headers={}) {

  return axios.create({
    baseURL: API_URL,
    timeout: TIMEOUT,
    headers
  })

}
