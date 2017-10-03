'use strict'

import Modals from 'mixins/modals'
import ModalsApps from 'mixins/modals-apps'

import tabOracleCluster from 'src/pages/dashboard/_modules/tabs/tab_oracle_cluster'
import tabCdbs from 'src/pages/dashboard/_modules/tabs/tab_cdbs'
import modalGroups from './groups.vue'

export default {
  mixins: [Modals, ModalsApps],

  components: {
    tabOracleCluster,
    modalGroups,
    tabCdbs
  },

  data () {
    return {
      cdb: 0,
      family: 'Database',
      initialData: {
        name: null, description: null, provider:null, storage_types:null, asm_groups: [],
        tags: [], pdbs: [], cluster: null, type: null,
        role: {port: null, endpoint: null}
      },
      options: {
        oracle: {
          cluster: [],
          type: [],
          third: [],
          own: []
        }
      },
      mapper: [
        {name: 'sga', label: 'SGA', validate: 'min:2'},
        {name: 'pga', label: 'PGA', validate: 'min:2'},
        {name: 'endpoint', label: 'Endpoint', validate: 'url'},
        {name: 'version', label: 'Version', validate: 'min:2'},
        {name: 'patch', label: 'Patch Level', validate: 'min:2'},
        {name: 'port', label: 'Port', validate: 'alpha_num'},
        {name: 'dns', label: 'DNS', validate: 'min:2'},
        {name: 'tns', label: 'TNS', type: 'textarea', validate: 'min:2'},
        {name: 'extra_config', label: 'Extra Configs', type: 'textarea', validate: 'min:2'}
      ]
    }
  },

  computed: {
    providers() {
      return this.own ? this.options.oracle.third : this.options.oracle.own
    }
  },

  methods: {
    afterShow() {
      this.text.title = this.create ? `Create new Oracle DB` : `Edit ${this.model.name} Oracle DB`
    },

    asmGroupChange(val) {
      this.$set(this.data, 'asm_groups', val)
    },

    typeChange(val) {
      const v = _.head(val)
      this.$set(this.data, 'type', v)
      this.$forceUpdate()
    },

    showModalGroups() {
      this.$refs.modal_groups.showModal = true
    },

    clearItems() {
      this.data.asm_groups = []
    }
  }
}
