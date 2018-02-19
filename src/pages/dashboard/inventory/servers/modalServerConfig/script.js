'use strict'

import _ from 'lodash'
import Modals from 'mixins/modals'
import tabTags from 'src/pages/dashboard/_modules/tabs/tab_tags'
import tabInit from 'src/pages/dashboard/_modules/tabs/tab_init'
import tabItems from 'src/pages/dashboard/_modules/tabs/tab_single_item'

import Servers from 'factories/servers'
import Adminer from 'factories/adminer'
import FectherEntity from 'services/fetchEntity'

export default {
  mixins: [Modals],

  components: {
    tabTags,
    tabItems,
    tabInit
  },

  props: {
    provider: {}
  },

  computed: {
    tab_items() {
      return this.$refs.tab_items
    },
    tab_init() {
      return this.$refs.tab_init
    },
    tab_envs() {
      return this.$refs.tab_envs
    }
  },

  data: function () {
    return {
      fielder: 'setup',
      initialData: {bin: null, user:null, package: null, init: {}, envs: [], mods:[]},
      data: {},
      options: {
        managers: []
      }
    }
  },

  methods: {
    afterShow() {
      this.text.title = `Host Config "${this.model.name}"`
    },

    createLoad () {
      const data = _.get(this.model, `item.${this.fielder}`, _.clone(this.initialData))
      this.$set(this, 'data', data)

      this.tab_items.updaterEdit(this.data.mods)
      this.tab_init.updaterEdit(this.data.init)
      this.tab_envs.updaterEdit(this.data.envs)
    },

    setupModel () {
      const {index} = this.model
      const data = _.pickBy(this.data, e=>!_.isEmpty(e))

      _.set(this.provider, `services[${index}].${this.fielder}`, data)
    },

    createSave () {
      this.setupModel()

      FectherEntity(Servers)()
        .patch(this.finishJob, this.provider)
    },

    fetchData() {
      FectherEntity(Adminer)({persistence: 'local'})
        .find(this.fetchAdminer, {key: 'services_options'})
    }
  },

  created() {
    this.fetchData()
  }

}
