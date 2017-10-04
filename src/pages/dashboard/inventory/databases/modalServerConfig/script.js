'use strict'

import Modals from 'mixins/modals'
import ModalsApps from 'mixins/modals-apps'

import FectherEntity from 'services/fetchEntity'
import Servers from 'factories/servers'


export default {
  mixins: [Modals, ModalsApps],

  props: {
    provider: {}
  },

  data: function () {
    return {
      family: 'Database',
      initialData: {
        dataguard: null, storage_types: null, name: null
      },
      options: {
        oracle: {
          storage_types: [],
          role: []
        }
      }
    }
  },

  methods: {
    afterShow() {
      this.text.title = `DB Config \"${this.model.hostname}\"`
    },

    editLoad () {
      this.fetchServer()
      this.$set(this.data, 'storage_types', _.get(this, 'provider.storage_types'))
      this.$set(this.data, 'dataguard', _.get(this, 'provider.dataguard'))
    },

    fetchServer: function (force=true) {
      if(_.has(this, 'model._id')) {
        FectherEntity(Servers)({force})
          .findOne((e) => {
            this.$set(this, 'model', e.data)
          }, this.model._id)
      }
    }
  }

}
