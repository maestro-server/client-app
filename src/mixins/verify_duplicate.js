'use strict'

import _ from 'lodash'
import FectherEntity from 'services/fetchEntity'

export default {
  data () {
    return {
      duplicate: {}
    }
  },

  methods: {
    verifyDuplicate({target}) {
      const {name} = target
      const value = this.data[name]

      if(!_.isEmpty(value)) {
        FectherEntity(this.entity)()
          .find(({data}) => this.processVerifyDuplicate(data, value, name), {[name]: value})
      }
    },

    processVerifyDuplicate(data, value, name) {
      const {found} = data
      let text = null

      if(found > 0) {
        text = `Found ${found} ${value} at ${name} in inventory, are you sure?`
      }

      this.$set(this.duplicate, name, text)
    },

    clearDuplicate() {
      this.duplicate = {}
    }
  }
}
