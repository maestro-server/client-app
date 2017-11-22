'use strict'
import store from 'src/store'
export default {
  props: {
    src: {type: String},
    classes: {type: String, default: "img-responsive img-circle"}
  },

  computed: {
    path () {
      if(this.src) {
        return `${_.get(store.getters, 'get_options.static_url')}${this.src}`
      }
    }
  }
}
