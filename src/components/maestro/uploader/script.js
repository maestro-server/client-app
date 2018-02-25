'use strict'
import validImage from './libs/validImage'
import Uploader from './libs/uploader'
import store from 'src/store'
export default {
  props: {
    refs: {type: String, default: "teams"},
    defaultImg: {type: String, default: IMG_AVATAR_DEFAULT},
    value: {default: null},
    imgSize: {type: String, default: "col-xs-12 col-sm-3"},
    inputSize: {type: String, default: "col-xs-12 col-sm-9"}
  },

  data () {
    return {
      spinner: false,
      label: null,
      file: null
    }
  },


  computed: {
    showAvatar() {
      if(this.file) {
        return `${_.get(store.getters, 'get_options.static_url')}${this.file}`
      }

      return this.defaultImg
    }
  },

  watch: {
    value(val) {
      this.file=val
    }
  },

  methods: {

    upload (files) {
      const file = files[0]
      if (file == null) {
        Uploader.uploadError('No file selected.', this.finishWithError)
        return;
      }

      let check = new validImage(file)
      if (check.pass()) {
        this.spinner = true

        new Uploader(this.refs)
          .setFinishUpload(this.finishCallBack)
          .setFinishUpload(this.finishWithError, 'callbackErr')
          .getSignedRequest(file)
        return;
      }

      const text = check.error.reduce((a, b) => `${a}, ${b}`)
      Uploader.uploadError(text, this.finishWithError)
    },

    finishCallBack(data, file) {
      const time = Math.round(new Date().getTime()/1000)
      this.spinner = false

      this.file=`${file.filename}?v=${time}`

      this.$nextTick()
      this.$emit('input', this.file)
    },

    finishWithError() {
      this.spinner = false
    }
  }
}
