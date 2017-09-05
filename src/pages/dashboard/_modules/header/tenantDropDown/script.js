'use strict'

import Teams from 'factories/teams'
import FectherEntity from 'services/fetchEntity'
import VBar from 'v-bar'


export default {
  components: {
    VBar
  },

  data () {
    return {
      showDropDown: false,
      teams: {}
    }
  },

  methods: {
    fetchData: function () {
      FectherEntity(Teams)(this)({k: 'teams'})
        .find((e) => {
          this.$set(this, 'teams', e.data)
        })
    },
    img_default(item) {
      const img = STATIC_URL + item.avatar

      return item.avatar ? img : IMG_AVATAR_DEFAULT
    }
  },

  computed: {
    users () {
      return this.$store.getters.get_me
    },
    tenant () {
      return this.$store.getters.get_tenant
    }
  },

  created () {
    this.fetchData()
  }
}
