'use strict'

import Modals from 'mixins/modals'
import Applications from 'factories/applications'


import FectherEntity from 'services/fetchEntity'

import tabFamilyApp from 'src/pages/dashboard/_modules/tabs/tab_family_applications'

export default {
  mixins: [Modals],

  components: {
    tabFamilyApp
  },

  data () {
    return {
      data: {deps: []},
      options: {
        protocol:[]
      },
      entity: Applications
    }
  },

  computed: {
    tab_targets() {return this.$refs.tab_targets}
  },

  methods: {
    afterShow () {
      this.text.title =  this.create ? 'Create new dependencies' : `Edit ${this.model.name} dependencies`
    },

    editLoad () {
      this.$set(this, 'data', this.model)
      this.tab_targets.updaterEdit(this.model.deps)
    },

    setupModel () {
      this.model = _.pickBy(this.data, _.identity)
    },

    editSave () {
      this.setupModel()

      FectherEntity(this.entity)()
        .update(this.finishJob, this.model)
    }
  }

}
