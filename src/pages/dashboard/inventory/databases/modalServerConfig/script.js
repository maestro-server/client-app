'use strict'

import _ from 'lodash'
import Modals from 'mixins/modals'
import SingleService from 'mixins/single-service'

import FectherEntity from 'services/fetchEntity'
import Servers from 'factories/servers'
import Applications from 'factories/applications'

import Adminer from 'factories/adminer'

export default {
  mixins: [Modals, SingleService],

  props: {
    provider: {}
  },

  data: function () {
    return {
      URL: `${new Applications().getUrl()}?query=`,
      family: 'Database',
      services: [],
      service: null,
      initialData: {
        dataguard: null, storage_types: null, db_hostname: null, asm: {}, disk: null, asm_name: null, role: null
      },
      data: {},
      options: {
        oracle: {
          storage_types: [],
          role: []
        },
        role: []
      },
      template: "<b>{{item.name}}</b>"
    }
  },

  computed: {
    showASM() {
      return this.data.storage_types == 'ASM' || this.data.storage_types == 'ACFS'
    },
    findServices() {
      return _(this.services)
                .map(this.wrapperReduce)
                .value()
    },
    listStorage() {
      return _.get(this.model, 'storage', [])
    },
    serviceMsg() {
      let msg = ''

      switch (this.findServices.length) {
        case 0:
          msg = `Not found any ${this.provider.provider} installed on this server, please install first.`
          break;
        case 1:
          msg = `Found 1 ${this.provider.provider} service installed on this server`
          break;
        default:
          msg = `This server have more than 1 ${this.provider.provider} installed, please choose one.`
          break;
      }

      return msg
    }
  },

  methods: {
    afterShow() {
      this.text.title = `DB Config "${this.model.hostname}"`
    },

    editLoad () {
      this.$set(this, 'data', this.initialData)
      this.fetchServer()
      this.$set(this.data, 'storage_types', _.get(this, 'provider.storage_types'))
      this.$set(this.data, 'dataguard', _.get(this, 'provider.dataguard'))
    },

    requestSearch(async, val, key = 'name', type='Database') {
      return `${async}%7B"${key}":"${val}", "type":"^Storage", "family":"${type}"%7D`
    },

    setupModel () {
      let services = _.get(this.model, 'services', [])
                      .map(this.findMatchesServices(this.service))

      return _.assign(this.model, {services})
    },

    findMatchesServices (service) {
      return (serv) => {
        const str = this.wrapperReduce(serv)

        if(str === service) {
          const configs = _.pickBy(this.data, _.identity)
          _.assign(serv, {configs})
        }
        return serv
      }
    },

    editSave () {
      this.setupModel()

      FectherEntity(Servers)()
        .patch(this.finishJob, this.model)
    },

    onHit(item) {
      this.clearASM()
      this.$set(this.data, 'asm', _.pick(item, ['_id', 'name']))
      this.$set(this.data, 'asm_name', null)
      return item.name
    },

    clearASM() {
      this.$set(this.data, 'asm', {})
    },

    fetchServer (force=true) {
      if(_.has(this, 'model._id')) {
        FectherEntity(Servers)({force})
          .findOne((e) => {
            this.$set(this, 'model', e.data)
            this.initialService(e.data)
          }, this.model._id)
      }
    },

    initialService(services) {
      const list = this.findServicesBy(services, this.provider.provider)
      this.$set(this, 'services', list)
      this.$set(this, 'service', this.wrapperReduce(_.head(list)))
      this.setService(this.service)
    },

    setService(search) {
      if(!_.isEmpty(search)) {
        const service = _.head(
          this.services.filter(e => this.wrapperReduce(e) === search)
        )

        let configs = _.clone(this.initialData)
        if(_.has(service, 'configs')) {
          _.assign(configs, this.data, service.configs)
        }
        _.defaults(configs, _.pick(this.provider, ['storage_types', 'dataguard']))

        this.$set(this, 'data', configs)
      }
    },
    fetchData() {
      const key = `database_options`

      FectherEntity(Adminer)({persistence: 'local'})
        .find(this.fetchAdminer, {key})
    }
  },

  created() {
    this.fetchData()
  }

}
