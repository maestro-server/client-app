'use strict'
import _ from 'lodash'
import Applications from 'factories/applications'
import ViewSingle from 'mixins/view-single'

export default {
  mixins: [ViewSingle],

  data: function () {
    return {
      entity: Applications,
      label: 'NAS',
      model: {tags: [], servers:[]},
      list_servers: [],
      rollbackRoute: 'nas'
    }
  },

  computed: {
    MDeps() {
      return this.$parent.$refs.modal_deps
    },
    filtered() {
      return _.omit(this.model, ['owner', 'roles', '_links', 'servers'])
    },
    viewDisplayer() {
      return [
        {val: this.model.environment, type: 'primary'},
        {val: this.model.provider}
      ]
    }
  },

  methods: {
    editM: function () {
      this.MDeps
        .onFinishCallBack(() => this.fetchData(this.id))
        .show(this.model)
    },
    fetchServers() {
      this.fetchServersF('servers')
    }
  },

  created() {
    this.$on('finishFetchData', this.fetchServers)
  }
}
