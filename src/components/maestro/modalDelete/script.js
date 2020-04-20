'use strict'
import Modals from 'mixins/modals'
import FectherEntity from 'services/fetchEntity'

export default {
  mixins: [Modals],

  props: {
    entity: {},
    fielder: { default: "name", type: String }
  },

  computed: {
    label () {
      return this.entity.ename
    }
  },

  methods: {
    afterShow () {
      this.text.title = `DELETE ${this.model[this.fielder]} ?`
    },

    editSave () {
      FectherEntity(this.entity)()
        .remove(this.finishJob, this.model)
    }
  }

}
