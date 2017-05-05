import axios from 'axios'
import {URL, TIMEOUT} from 'config/api.env'

export default function() {

  return axios.create({
    baseURL: URL,
    timeout: TIMEOUT
  });

}
