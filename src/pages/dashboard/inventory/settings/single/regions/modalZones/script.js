'use strict'

import Modals from 'mixins/modals'
import TabCreaterList from 'mixins/tab-creater-list'

export default {
  mixins: [Modals, TabCreaterList],

  data() {
    return {
      item: null,
      items: [],
      data: {}
    }
  },

  methods: {
    createLoad () {
      this.$set(this, 'items', this.model.regions)
      this.$set(this, 'provider', this.model.provider)
    },

    setupModel () {
      this.model = _.pickBy(this.items, _.identity)
    },

    createSave () {
      this.setupModel()
      this.$emit('update', this.model, this.provider)
    }
  }

}
