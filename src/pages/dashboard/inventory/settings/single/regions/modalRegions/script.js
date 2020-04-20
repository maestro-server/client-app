'use strict'

import Modals from 'mixins/modals'
import tabItems from 'src/pages/dashboard/_modules/tabs/tab_single_item'
import tabArrayItems from 'src/pages/dashboard/_modules/tabs/tab_array_item'


export default {
  mixins: [Modals],

  components: {
    tabItems,
    tabArrayItems
  },

  computed: {
    tab_items () { return this.$refs.tab_items }
  },

  data () {
    return {
      data: {},
      provider: null,
      regions: []
    }
  },

  methods: {
    createLoad () {
      this.$set(this, 'data', _.clone(this.model.regions))
      this.$set(this, 'provider', this.model.provider)
      this.tab_items.updaterEdit(this.data)
    },

    setupModel () {
      this.model = _.pickBy(this.data, _.identity)
    },

    createSave () {
      this.setupModel()
      const data = _.map(this.regions, _.clone)
      this.$emit('update', data, this.provider)
      this.finishJob()
    }
  }

}
