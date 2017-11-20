'use strict'
import static_url from 'src/resources/libs/static_url'

export default {
  props: {
    src: {type: String},
    classes: {type: String, default: "img-responsive img-circle"}
  },

  computed: {
    path () {
      if(this.src) {
        return `${static_url}${this.src}`
      }
    }
  }
}
