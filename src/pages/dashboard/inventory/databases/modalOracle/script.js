'use strict'

import Modals from 'mixins/modals'
import ModalsApps from 'mixins/modals-apps'

import Adminer from 'factories/adminer'
import FectherEntity from 'services/fetchEntity'

import tabCdbs from 'src/pages/dashboard/_modules/tabs/tab_single_item'
import modalGroups from './groups.vue'

export default {
  mixins: [Modals, ModalsApps],

  components: {
    modalGroups,
    tabCdbs
  },

  data () {
    return {
      cdb: 0,
      family: 'Database',
      foptions: 'Oracle',
      modal: 'oracle',
      initialData: {
        name: null, description: null, provider:null, storage_types:null, asm_groups: [],
        tags: [], pdbs: [], cluster: null, crs_version: null, type: null,
        role: {port: null, endpoint: null}
      },
      options: {
        third: [],
        own: [],
        oracle: {
          cluster: [],
          type: []
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
    },

    hookCreateLoad() {
      this.$set(this.data, 'modal', this.modal)
    },

    fetchOptions() {
      const key = `database_options`

      FectherEntity(Adminer)({persistence: 'local'})
        .find(this.fetchAdminer, {key})
    }
  },

  created() {
    this.fetchOptions()
  }
}
