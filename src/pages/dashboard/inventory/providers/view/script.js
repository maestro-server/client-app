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
    task(key) {
      new Providers()
        .authorization()
        .updateID(
          `${this.model._id}/task/${key}`,
          this.logTask,
          this.logTask
        )
    },

    logTask() {
      this.fetchData()
    },

    fetchAdminer() {
      FectherEntity(Adminer)({persistence: 'local'})
        .find(this.setOptions, {key: 'providers'})
    },

    setOptions(data) {
      const adminer = formatAdminer(data)
      this.prepareProcessData(adminer)
    },

    prepareProcessData(adminer) {
      const prm = _.chain(adminer)
        .get(`permissions.${this.model.name}`)
        .mapValues(this.mergeLog)
        .value()

      this.$set(this, 'permissions', prm)
    },

    mergeLog(data, key) {
      const process = _.get(this.model, `process.${key}`, null)
      return _.assign({}, data, process)
    }
  },

  created() {
    this.$on('finishFetchData', this.fetchAdminer)
  }
}
