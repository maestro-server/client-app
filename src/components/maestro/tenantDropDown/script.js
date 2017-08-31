'use strict'

import Teams from 'factories/teams'
import FectherEntity from 'services/fetchEntity'


export default {
  data () {
    return {
      teams: {}
    }
  },

  method: {
    fetchData: function () {
      FectherEntity(Teams)(this)({k: 'teams'})
        .find((e) => {
          this.$set(this, 'teams', e.data)
        })
    }
  },

  created () {
    this.fetchData()
  }
}
