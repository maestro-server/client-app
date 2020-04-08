'use strict'

import Maestro from 'factories/maestro'
import FectherEntity from 'services/fetchEntity'

export default {
  data: function () {
    return {
      title: "About",
      options: {
        info: {}
      }
    }
  },


  methods: {
    fetchData() {
      FectherEntity(Maestro)({path: '/versions'})
        .find((e) => {
          this.$set(this.options, 'info', e.data)
        })
    }
  },

  created() {
    this.fetchData()
  }
}
