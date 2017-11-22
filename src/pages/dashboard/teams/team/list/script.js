'use strict'

import Teams from 'factories/teams'
import ListBox from 'mixins/list-boxs'
import store from 'src/store'
export default {
  mixins: [ListBox],

  props: {
    defaultImg: {type: String, default: IMG_AVATAR_DEFAULT}
  },

  data: function () {
    return {
      entity: Teams,
      name: "Team",
    }
  },

  methods: {
    make_avatar(src) {
      if(src.avatar) {
        return `${_.get(store.getters, 'get_options.static_url')}${src.avatar}`
      }

      return this.defaultImg
    }
  }
}
