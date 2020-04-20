'use strict'

import Modals from 'mixins/modals'
import Adminer from 'factories/adminer'
import FectherEntity from 'services/fetchEntity'
import modalRegions from './modalRegions/create'

export default {
  mixins: [Modals],

  components: {
    modalRegions
  },

  computed: {
    MRegions () {
      return this.$refs.modal_regions
    },
    showList () {
      return !_.isEmpty(this.model, 'value.baser')
    }
  },

  methods: {
    optP (data) {
      this.$parent.optE(data)
    },

    regionsE: function (entity) {
      this.MRegions
        .show(entity)
    },

    setupModel (data, provider) {
      this.$set(this.model.value.baser, provider, data)
    },

    editSave (data, provider) {
      this.setupModel(data, provider)
      FectherEntity(Adminer)()
        .patch(this.$forceUpdate(), this.model)
    },

    fetchData (force = true) {
      FectherEntity(Adminer)({ persistence: 'local', time: 42400, force })
        .find(e => {
          this.$set(this, 'model', _.head(_.get(e, 'data.items', [])))
        }, { key: 'datacenter_options' })
    }
  },

  created () {
    this.fetchData()
  }
}
