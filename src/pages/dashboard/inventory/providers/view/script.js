'use strict'
import _ from 'lodash'

import Providers from 'factories/providers'
import ViewSingle from 'mixins/view-single'
import Adminer from 'factories/adminer'
import FectherEntity from 'services/fetchEntity'
import formatAdminer from 'src/resources/libs/formatAdminerData'

export default {
  mixins: [ViewSingle],

  data: function () {
    return {
      entity: Providers,
      model: {},
      permissions: []
    }
  },

  computed: {
    filtered() {
      return _.omit(this.model, ['owner', 'roles', 'active', '_links', 'conn'])
    }
  },

  methods: {
    task(type) {

    },

    getlog(key, len='msg', def=null) {
      return _.get(this.model, `process.${key}.${len}`, def)
    },

    fetchAdminer() {
      FectherEntity(Adminer)({persistence: 'local'})
        .find(this.setOptions, {key: 'providers'})
    },

    setOptions(data) {
      const res = formatAdminer(data)
      const prm = _.get(res, `permissions.${this.model.name}`)
      this.$set(this, 'permissions', prm)
    }
  },

  created() {
    this.$on('finishFetchData', this.fetchAdminer)
  }
}
