'use strict'

import _ from 'lodash'
import formatDate from 'mixins/formatDate'
import FactoryTenant from 'factories/factoryTenant'
import FectherEntity from 'services/fetchEntity'
import treeView from 'components/maestro/infoView/TreeViewItem.vue'

export default {
  mixins: [formatDate],

  components: {
    treeView
  },

  data: function () {
    return {
      model: {},
      id: null,
      entity: null,
      history: [],
      blueprint: []
    }
  },

  computed: {
    getName() {
      return _.get(this.model, 'name', _.get(this.model, 'hostname', ''))
    }
  },

  methods: {
    isEmpty: function (value) {
      if(_.isArray(value)) {
        return value.length <= 0
      }
      if(_.isObject(value)) {
        return _.isEmpty(value);
      }
      return value == null;
    },
    sortRow(row) {
      return _(row).toPairs().sortBy(0).fromPairs().value()
    },
    fetchData: function () {
      const path = `${this.entity}`
      FectherEntity(FactoryTenant)({path})
        .findOne((e) => {
          this.$set(this, 'model', e.data)
        }, this.id)
    },
    fetchHistory: function (force=true) {
      const path = `${this.entity}/${this.id}/audit`

      FectherEntity(FactoryTenant)({path, force})
        .find((e) => {
          this.$set(this, 'history', _.get(e, 'data.items', []))
        });
    }
  },

  created() {
    this.control = 0

    this.id = this.$route.params.id
    this.entity = this.$route.params.entity
    this.fetchData()
    this.fetchHistory()
  }
}



