'use strict'
import _ from 'lodash'
import Servers from 'factories/servers'
import Applications from 'factories/applications'
import Adminer from 'factories/adminer'
import FectherEntity from 'services/fetchEntity'

export default {

  data () {
    return {
      own: 0,
      data: {},
      options: {
        third: [],
        own: []
      },
      outher: false,
    }
  },

  computed: {
    providers() {
      return this.own ? this.options.third : this.options.own
    },
    labelPService() {
      return this.own ? 'Provider' : 'Service'
    },
    labelBtnChangeProvider() {
      return this.outher ? 'Back to selection '+this.labelPService : '<i class="fa fa-plus"></i> '+this.labelPService
    },
    changeType() {
      return this.outher ? 'btn-warning' : 'btn-primary'
    }
  },

  methods: {
    afterShow () {
      this.text.title =  this.create ? `Create new ${this.family}s` : `Edit ${this.model.name} ${this.family.toLowerCase()}s`
    },

    editLoadServers(fielder) {
      if (!_.isEmpty(this.model[fielder])) {
        FectherEntity(Servers)()
          .find((e) => {
            this[`tab_${fielder}`].updaterEdit(_.get(e, 'data.items', []))
          }, {_id: this.model[fielder]})
      }
    },

    setupModel () {
      _.set(this.data, 'family', this.family)
      this.model = _.pickBy(this.data, _.identity)
    },

    createSave () {
      this.setupModel()

      FectherEntity(Applications)()
        .create(this.finishJob, this.model)
    },

    editSave () {
      this.setupModel()

      FectherEntity(Applications)()
        .update(this.finishJob, this.model)
    },

    fetchData() {
      const key = `${this.family.toLowerCase()}_options`

      FectherEntity(Adminer)({persistence: 'local'})
        .find(this.fetchAdminer, {key})
    },

    changeProvider() {
      this.outher = !this.outher
    }
  },

  created() {
    this.fetchData()
  }
}
