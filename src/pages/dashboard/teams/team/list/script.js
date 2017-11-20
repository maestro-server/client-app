'use strict'

import Teams from 'factories/teams'
import ListBox from 'mixins/list-boxs'
import static_url from 'src/resources/libs/static_url'

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
        return `${static_url}${src.avatar}`
      }

      return this.defaultImg
    }
  }
}
