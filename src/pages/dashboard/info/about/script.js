'use strict'

import Maestro from 'factories/maestro'
import FectherEntity from 'services/fetchEntity'

export default {
  data: function () {
    return {
      title: "About",
      services: []
    }
  },


  methods: {
    fetchData() {
      FectherEntity(Maestro)({path: '/versions'})
        .find((e) => {
          this.$set(this, 'services', e.data)
        })
    }
  },

  created() {
    this.fetchData()
  }
}
