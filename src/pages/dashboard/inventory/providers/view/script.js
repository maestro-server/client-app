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
      owner_user: null,
      entity: Providers,
      model: {},
      permissions: []
    }
  },

  computed: {
    filtered() {
      return _.omit(this.model, ['owner', 'roles', 'active', '_links', 'conn'])
    },

    formatOwnerUsers() {
      const roles = _.get(this.model, 'roles')
      if (roles) {
        return roles.map(this.formatOwnerUser)
      }
    }
  },

  methods: {
    formatOwnerUser(data) {
      return {
        'name': `${data.refs} - ${data.email} (${data._id})`,
        '_id': data._id
      }
    },

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
      this.owner_user = this.formatOwnerUser(_.get(this.model, 'owner_user'))

      FectherEntity(Adminer)({persistence: 'local'})
        .find(this.setOptions, {key: 'providers'})
    },

    setOptions(data) {
      const adminer = formatAdminer(data)
      this.prepareProcessData(adminer)
    },

    prepareProcessData(adminer) {
      const prm = _.chain(adminer)
        .get(`permissions.${this.model.provider}`)
        .mapValues(this.mergeLog)
        .value()

      this.$set(this, 'permissions', prm)
    },

    mergeLog(data, key) {
      const process = _.get(this.model, `process.${key}`, null)
      return _.assign({}, data, process)
    },

    saveOwner() {

    }
  },

  created() {
    this.$on('finishFetchData', this.fetchAdminer)
  }
}
