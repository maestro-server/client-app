'use strict'

import Modals from 'mixins/modals'
import tabItems from 'src/pages/dashboard/_modules/tabs/tab_single_item'


export default {
  mixins: [Modals],

  components: {
    tabItems
  },

  computed: {
    tab_items() {return this.$refs.tab_items}
  },

  data () {
    return {
      entity: null,
      provider: null,
      data: {}
    }
  },

  methods: {
    createLoad () {
      this.$set(this, 'data', this.model.regions)
      this.$set(this, 'provider', this.model.provider)
      this.tab_items.updaterEdit(this.data)
    },

    setupModel () {
      this.model = _.pickBy(this.data, _.identity)
    },

    createSave () {
      this.setupModel()
      this.$emit('update', this.model, this.provider)
    }
  }

}
