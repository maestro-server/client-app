import store  from 'store'
import defaultImg from 'imgs/avatar_default.jpeg'
import validImage from 'resources/repositories/validImage'
import Uploader from 'services/uploader'

export default {
  props: {
    refs: {
      type: String,
      default: "teams"
    },
    defaultImg: {
      type: String,
      default: defaultImg
    },
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
        const time = Math.round(new Date().getTime()/1000)
        return `${STATIC_URL}${this.file}?v=${time}`
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
        Uploader.uploadError('No file selected.')
        return;
      }

      let check = new validImage(file)
      if (check.pass()) {
        this.spinner = true

        new Uploader(this.refs)
          .setFinishUpload(this.finishCallBack)
          .getSignedRequest(file)
        return;
      }

      const text = check.error.reduce((a, b) => `${a}, ${b}`)
      Uploader.uploadError(text)
    },

    finishCallBack(data, file) {
      this.spinner = false

      this.file=file.filename
      this.$emit('input', file.filename)
    }
  }
}
