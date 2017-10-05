'use strict'

import _ from 'lodash'
import Modals from 'mixins/modals'
import tabTags from 'src/pages/dashboard/_modules/tabs/tab_tags'
import tabItems from 'src/pages/dashboard/_modules/tabs/tab_single_item'

export default {
  mixins: [Modals],

  components: {
    tabTags,
    tabItems
  },

  props: {
    provider: {}
  },

  computed: {
    tab_items() {
      return this.$refs.tab_items
    },
    tab_tags() {
      return this.$refs.tab_tags
    }
  },

  data: function () {
    return {
      data: {
        bin: null, user:null, package: null, envs: [], mods:[]
      }
    }
  },

  methods: {
    afterShow() {
      this.text.title = `Host Config \"${this.model.name}\"`
    },

    editLoad () {
    }
  }

}
