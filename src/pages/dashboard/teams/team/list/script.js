'use strict'

import Teams from 'factories/teams'
import ListBox from 'mixins/list-boxs'
import store from 'src/store'

const img_avatar_default = process.env.VUE_APP_IMG_AVATAR_DEFAULT;

export default {
  mixins: [ListBox],

  props: {
    defaultImg: {type: String, default: img_avatar_default}
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
