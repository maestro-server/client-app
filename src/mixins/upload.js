'use strict';

import validImage from 'resources/repositories/validImage';
import Uploader from 'services/uploader'

// define a mixin object
export default {
  data () {
    return {
      labelFile: null,
      ref: null
    }
  },

  methods: {
    setRefUploader(data='users') {
      this.ref=data
    },

    upload (files) {
      const file = files[0];
      if(file == null){
          Uploader.uploadError('No file selected.');
          return;
      }

      let check = new validImage(file);
      if(check.pass()) {
          new Uploader(this.ref).getSignedRequest(file);
          this.labelFile = "Loading file ...";
          return;
      }

      const error = check.error;
      const text = error.reduce((a, b) => `${a}, ${b}`);
      Uploader.uploadError(text);
    }
  }
}
