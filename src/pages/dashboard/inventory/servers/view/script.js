'use strict'
import _ from 'lodash'

import Servers from 'factories/servers'
import FectherEntity from 'services/fetchEntity'

export default {

  data: function () {
    return {
      id: null,
      model: {tags: [], auth:[], services:[], storage: [], logs: [], os:{base:null}, datacenters:{name:null}, active:true}
    }
  },

  computed: {
    MCreate() {
      return this.$parent.$refs.modal_create
    },
    MDelete() {
      return this.$parent.$refs.modal_delete
    },
    activeShow() {
      return this.model.active ? "success" : "danger"
    },
    activeLabel() {
      return this.model.active ? "Active" : "Desactive"
    },
    filtered() {
      return _.omit(this.model, ['owner', 'roles', 'active', '_links'])
    }
  },

  methods: {
    existGet(key, path) {
      return _.get(key, path, false)
    },

    edit: function (index=0) {
      this.MCreate
        .setTabShow(index)
        .onFinishCallBack(() => this.fetchData(this.id))
        .show(this.model)
    },

    del: function () {
      this.MDelete
        .onFinishCallBack(() => this.$router.push({name: 'servers'}))
        .show(this.model)
    },

    fetchData: function () {
      FectherEntity(Servers)({k: 'server_' + this.id})
        .findOne((e) => {
          this.$set(this, 'model', e.data)
        }, this.id)
    }
  },

  created() {
    this.id = this.$route.params.id
    this.fetchData()
  }
}
