'use strict'

import Modals from 'mixins/modals'
import Adminer from 'factories/adminer'
import FectherEntity from 'services/fetchEntity'

import modalRegions from './modalRegions/create'
import modalZones from './modalZones/create'

export default {
  mixins: [Modals],

  components: {
    modalRegions,
    modalZones
  },

  computed: {
    MRegions() {
      return this.$refs.modal_regions
    },
    MZones() {
      return this.$refs.modal_zones
    },
    showList() {
      return !_.isEmpty(this.model, 'value.baser')
    }
  },

  methods: {
    optP(data) {
      this.$parent.optE(data)
    },

    regionsE: function (entity) {
      this.MRegions
        .onFinishCallBack(this.fetchData())
        .show(entity)
    },

    zonesE: function (entity) {
      this.MZones
        .onFinishCallBack(this.fetchData())
        .show(entity)
    },

    setupModel(provider, data) {
      _.set(this.model.value, `baser.${provider}`, data)
    },

    editSave(data, provider) {
      this.setupModel(data, provider)

      console.log()
      FectherEntity(Adminer)()
        .patch(this.finishJob, this.model)
    },

    fetchData() {
      FectherEntity(Adminer)({persistence: 'local', force: true, time: 42400})
        .find(e=> {
          this.$set(this, 'model', _.head(_.get(e, 'data.items', [])))
        }, {key: 'datacenter_options'})
    }
  },

  created() {
    this.fetchData()
  }
}
