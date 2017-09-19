'use strict'

import Teams from 'factories/teams'
import ListBox from 'mixins/list-boxs'

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
        return `${STATIC_URL}${src.avatar}`
      }

      return this.defaultImg
    }
  }
}
