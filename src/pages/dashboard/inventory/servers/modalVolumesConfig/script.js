'use strict'

import _ from 'lodash'
import Modals from 'mixins/modals'
import Servers from 'factories/servers'
import FectherEntity from 'services/fetchEntity'

export default {
  mixins: [Modals],

  props: {
    provider: {}
  },

  data: function () {
    return {
      enabled: false,
      initialData: {mount: null, ftype: null, lvm: false, pv: null, vg: null},
      data: {},
      options: {
        managers: []
      }
    }
  },

  methods: {
    afterShow() {
      this.text.title = `Volume Config "${this.data.name}"`
    },

    createLoad () {
      const data = _.get(this.model, `item`, _.clone(this.initialData))
      this.$set(this, 'data', data)
      this.$set(this, 'enabled', _.get(this.data, 'lvm', false))
    },

    setupModel () {
      const {index} = this.model
      const data = _.pickBy(this.data, e=>!_.isEmpty(e))
      this.$set(data, 'lvm', this.enabled)

      const merged = _.assign(_.get(this.provider, `storage[${index}]`, {}), data)
      _.set(this.provider, `storage[${index}]`, merged)
    },

    createSave () {
      this.setupModel()

      FectherEntity(Servers)()
        .patch(this.finishJob, this.provider)
    }
  }

}
