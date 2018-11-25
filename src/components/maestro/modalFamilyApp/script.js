'use strict'

import Modals from 'mixins/modals'
import Applications from 'factories/applications'


import FectherEntity from 'services/fetchEntity'

import tabFamilyApp from 'src/pages/dashboard/_modules/tabs/tab_family_applications'

export default {
  mixins: [Modals],

  props: {
    field: {default: "deps"},
    label: {default: "dependencies"},
    entity: {default: () => Applications}
  },

  components: {
    tabFamilyApp
  },

  data () {
    return {
      data: {deps: []},
      options: {
        protocol:[]
      }
    }
  },

  computed: {
    tab_targets() {return this.$refs.tab_targets}
  },

  methods: {
    afterShow () {
      this.text.title =  this.create ? `Create new ${this.label}`: `Edit ${this.model.name} ${this.label}`
    },

    editLoad () {
      this.$set(this, 'data', this.model)
      this.tab_targets.updaterEdit(_.get(this.model, this.field, []))
    },

    setupModel () {
      this.model = _.pickBy(this.data, _.identity)
    },

    editSave () {
      this.setupModel()

      FectherEntity(this.entity)()
        .update(this.finishJob, this.model)
    },

    updateData(val) {
      this.$set(this.data, this.field, val)
    }
  }

}
