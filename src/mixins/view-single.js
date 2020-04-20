'use strict'

import FectherEntity from 'services/fetchEntity'
import Servers from 'factories/servers'

export default {
  data: function () {
    return {
      id: null
    }
  },

  computed: {
    getName () {
      const ety = new this.entity()
      return ety.getName()
    },
    MCreate () {
      return this.$parent.$refs.modal_create
    },
    MAcl () {
      return this.$parent.$refs.modal_acl
    },
    MDelete () {
      return this.$parent.$refs.modal_delete
    }
  },

  methods: {
    slugApps (str) {
      return _.kebabCase(str)
    },

    toLower (str, app = '') {
      return app + _.kebabCase(str.toLowerCase())
    },

    edit: function (index = 0) {
      this.MCreate
        .setTabShow(index)
        .onFinishCallBack(() => this.fetchData(this.id))
        .show(this.model)
    },

    acl () {
      this.MAcl
        .onFinishCallBack(() => this.fetchData(true))
        .show(this.model)
    },

    del: function () {
      const call = this.rollbackRoute || this.entity.ename

      this.MDelete
        .onFinishCallBack(() => this.$router.push({ name: call }))
        .show(this.model)
    },

    fetchServersF (fielder, entities = Servers) {
      const data = 'list_' + fielder

      if (!_.isEmpty(this.model[fielder])) {

        FectherEntity(entities)({ force: true })
          .find((e) => {
            this.$set(this, data, _.get(e, 'data.items', []))
          }, { _id: this.model[fielder] })
      } else {
        this.$set(this, data, [])
      }
    },

    fetchData: function (force = true) {
      FectherEntity(this.entity)({ force })
        .findOne((e) => {
          this.$set(this, 'model', e.data)
          this.$emit('finishFetchData', e.data)
        }, this.id)
    }
  },

  created () {
    this.id = this.$route.params.id
    this.fetchData()
  }
}
