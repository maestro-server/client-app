'use strict'
export default {
  props: {
    src: {type: String},
    classes: {type: String, default: "img-responsive img-circle"}
  },

  computed: {
    path () {
      if(this.src) {
        return `${STATIC_URL}${this.src}`
      }
    }
  }
}
