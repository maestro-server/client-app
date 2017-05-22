'use strict';

import store from 'store'
import Login from 'services/login'
import axios from 'axios'

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
    const URL = `${API_URL}/${this.ref}/upload?filetype=${file.type}`

    axios.get(URL, {headers: {"Authorization": Login.Authorization()}})
      .then((result) => {
        this.uploadFile(file, result.data)
      })
      .catch(() => {
        Uploader.uploadError("We accept only jpg or png")
      });
  }

  uploadFile(file, resp) {
    const xhr = new XMLHttpRequest();

    xhr.open('PUT', resp.signedRequest)
    xhr.setRequestHeader("Content-Type", file.type)
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.callback(file, resp)
        }
        else {
          Uploader.uploadError('Could not upload file.')
        }
      }
    };
    xhr.send(file);
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
