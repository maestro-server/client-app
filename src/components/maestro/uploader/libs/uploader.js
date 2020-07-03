"use strict";

import Login from "services/login";
import axios from "axios";

import api_url from "src/resources/libs/api_url";
import { EventBus } from "src/resources/bus/bus-general.js";

class Uploader {
  constructor(ref = null) {
    this.ref = ref || "users";
    this.callback = () => {};
    this.callbackErr = null;
  }

  setFinishUpload(callback, method = "callback") {
    this[method] = callback;
    return this;
  }

  getSignedRequest(file) {
    const URL = `${api_url}/${this.ref}/upload?filetype=${file.type}&filename=${file.name}`;

    axios
      .get(URL, { headers: { Authorization: Login.Authorization() } })
      .then(result => {
        this.uploadFile(file, result.data);
      })
      .catch(() => {
        Uploader.uploadError("We accept only jpg or png", this.callbackErr);
      });
  }

  uploadFile(file, resp) {
    const { signedRequest, headers } = resp;
    axios
      .put(signedRequest, file, { headers })
      .then(() => {
        this.callback(file, resp);
      })
      .catch(() => {
        Uploader.uploadError("Could not upload file.", this.callbackErr);
      });
  }

  static uploadError(title, cb = null) {
    const data = {
      show: true,
      title,
      msg: "Sorry, maybe your image sank in the ocean, try again",
      type: "danger"
    };

    EventBus.$emit("call-notify", data);
    if (cb) cb();
  }
}

export default Uploader;
