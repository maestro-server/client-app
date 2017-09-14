'use strict'
import _ from 'lodash'

import Servers from 'factories/servers'
import ViewSingle from 'mixins/view-single'


export default {
  mixins: [ViewSingle],

  data: function () {
    return {
      key: 'servers',
      entity: Servers,
      model: {tags: [], auth:[], services:[], storage: [], logs: [], os:{base:null}, datacenters:{name:null}, active:true}
    }
  },

  computed: {
    filtered() {
      return _.omit(this.model, ['owner', 'roles', 'active', '_links'])
    },
    viewDisplayer() {
      return [
        {val: this.model.active ? "Active" : "Terminated", type: this.model.active ? "success" : "danger"},
        {val: this.model.environment},
        {val: this.model.role},
        {val: _.get(this.model, 'os.base', false)},
        {val: _.get(this.model, 'datacenters.name', false)},
        {val: this.model.ipv4_private}
      ]
    }
  }
}
