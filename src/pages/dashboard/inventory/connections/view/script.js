'use strict'
import _ from 'lodash'

import Connections from 'factories/connections'
import ViewSingle from 'mixins/view-single'
import Adminer from 'factories/adminer'
import FectherEntity from 'services/fetchEntity'
import formatAdminer from 'src/resources/libs/formatAdminerData'

export default {
  mixins: [ViewSingle],

  data: function () {
    return {
      status: 'enabled',
      owner_user: null,
      entity: Connections,
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
    enable(status) {
      this.status = status
      const data = _.set(this.model, `status`, status)

      FectherEntity(Connections)()
        .patch(this.finishJob, data)
    },

    processEnable(key, state) {
      const data = _.set(this.model, `process.${key}.state`, state)

      FectherEntity(Connections)()
        .patch(this.logTask, data)
    },

    formatOwnerUser(data) {
      const id = _.get(data, '_id')
      if(id) {
        return {
          'name': `${_.get(data, 'refs', '')} - ${_.get(data, 'email', '')} (${_.get(data, '_id', '')})`,
          '_id': id
        }
      }
    },

    task(key) {
      new Connections()
        .authorization()
        .updateID(
          `${this.model._id}/task/${key}`,
          this.logTask
        )
    },

    logTask() {
      this.fetchData()
    },

    fetchAdminer() {
      const ouser = this.formatOwnerUser(_.get(this.model, 'owner_user'))
      if(ouser) {
        this.owner_user = ouser
      }

      this.status = _.get(this.model, 'status')

      FectherEntity(Adminer)({persistence: 'local'})
        .find(this.setOptions, {key: 'connections'})
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
      const id_user = _.get(this.owner_user, '_id')

      if(id_user) {
        let owner_user = _.chain(this.model.roles)
                          .filter(e=>id_user == e._id)
                          .head()
                          .omit('_links')
                          .value()

        const old = _.pick(this.model, ['_id', 'name', 'dc', 'dc_id', 'provider', 'regions', 'conn'])
        const post = _.assign(old, {owner_user})

        FectherEntity(Connections)()
          .patch(this.redirectConn, post)
      }
    }
  },

  created() {
    this.$on('finishFetchData', this.fetchAdminer)
  }
}
