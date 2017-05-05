import axios from 'axios'
import url from 'config/api.env'

export default function(objs = {}) {

  console.log(url)

  return axios.create({
    baseURL: url,
    timeout: 30,
    headers: objs
  });

}
