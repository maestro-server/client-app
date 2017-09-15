'use strict'

import _ from 'lodash'

import Datacenters from 'factories/datacenters'
import ListBox from 'mixins/list-boxs'

export default {
  mixins: [ListBox],

  data: function () {
    return {
      entity: Datacenters,
      name: "Datacenters"
    }
  },

  computed: {
    MInstances () {
      return this.$parent.$refs.modal_instances
    }
  }
}
