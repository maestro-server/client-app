'use strict'

import axios from 'axios'
import frejected from '../callbacks/request_rejected'

export default (name, url, type) => {
  axios({
    url,
    responseType: 'arraybuffer'
  })
    .then(function (response) {
      let blob = new Blob([response.data], {type})
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.setAttribute('download', name);
      link.click()
    })
   .catch(frejected);
}
