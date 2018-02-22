'use strict';

import store from 'src/store'
import Login from 'services/login'
import axios from 'axios'

import api_url from 'src/resources/libs/api_url'

class Uploader {

  constructor(ref = null) {
    this.ref = ref
    this.callback = () => {
    }
  }

  setFinishUpload(callback) {
    this.callback = callback
    return this
  }

  getSignedRequest(file) {
    const URL = `${api_url}/${this.ref}/upload?filetype=${file.type}`

    axios.get(URL, {headers: {"Authorization": Login.Authorization()}})
      .then((result) => {
        this.uploadFile(file, result.data)
      })
      .catch(() => {
        Uploader.uploadError("We accept only jpg or png")
      });
  }

  uploadFile(file, resp) {
    axios.put(resp.signedRequest, file, {headers: {"Content-Type": file.type}})
      .then(() => {
        this.callback(file, resp)
      })
      .catch(() => {
        Uploader.uploadError('Could not upload file.')
      });
  }

  static uploadError(title) {
    const data = {
      show: true,
      title,
      msg: "Sorry, maybe your image sank in the ocean, try again",
      type: "danger"
    }

    store.dispatch('callAlert', {...data})
  }

}

export default Uploader;
