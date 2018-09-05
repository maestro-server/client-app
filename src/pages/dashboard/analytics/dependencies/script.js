'use strict'

import _ from 'lodash'
import Graphs from 'factories/graphs'
import dprow from './modules/DpRow'

export default {

  components: {
    dprow
  },

  data() {
    return {
      entity: Graphs,
      app: {},
      grid: []
    }
  },

  methods: {
    addBags(app, step) {
      this.grid[step].push(app)
    },

    addRow(deps, step) {
      this.grid.splice(step+1)
      this.grid.push(deps)
    },

    activedApp(app) {
      let napp = _.omit(app, ['_links', 'deps', 'roles', 'owner']);
      this.$set(this, 'app', napp);
    }
  }
}
