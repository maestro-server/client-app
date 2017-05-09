import axios from 'axios'
import {URL, TIMEOUT} from 'config/api.env'

export default function(headers={}) {

  return axios.create({
    baseURL: URL,
    timeout: TIMEOUT,
    headers
  })

}
