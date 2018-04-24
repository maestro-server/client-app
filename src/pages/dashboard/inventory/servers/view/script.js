'use strict'
import _ from 'lodash'

import Servers from 'factories/servers'
import Volumes from 'factories/volumes'
import ViewSingle from 'mixins/view-single'
import FectherEntity from 'services/fetchEntity'
import modalConfig from '../modalServerConfig/create'

export default {
  mixins: [ViewSingle],

  components: {
    modalConfig
  },

  data: function () {
    return {
      list_volumes: [],
      entity: Servers,
      model: {tags: [], auth:[], services:[], storage: [], logs: [], os:{base:null}, datacenters:{name:null}, active:true}
    }
  },

  computed: {
    MCreateConfigServer() {
      return this.$refs.modal_config
    },
    filtered() {
      return _.omit(this.model, ['owner', 'roles', 'active', '_links'])
    },
    viewDisplayer() {
      return [
        {val: this.model.active ? "Active" : "Terminated", type: this.model.active ? "success" : "danger"},
        {val: _.get(this.model, 'environment')},
        {val: _.get(this.model, 'role')},
        {val: _.get(this.model, 'os.base', false)},
        {val: _.get(this.model, 'datacenters.name', false)},
        {val: _.get(this.model, 'ipv4_private')}
      ]
    }
  },

  methods: {
    callConfig(item) {
      this.MCreateConfigServer
        .onFinishCallBack(() => this.fetchData(this.id))
        .show(item)
    },

    fetchVolumes(force = true) {
      if (this.model) {
        const uniques = _.chain(this.model)
                        .get('storage')
                        .filter(e => _.has(e, 'unique_id'))
                        .map(e => e.unique_id)
                        .value()
        
        FectherEntity(Volumes)({force})
          .find((e) => {
            console.log(e.data.items)
            this.$set(this, 'list_volumes', _.get(e, 'data.items', []))
          }, {"unique_id": uniques})
      }
    }
  },

  created() {
    this.$on('finishFetchData', this.fetchVolumes)
  }
}
