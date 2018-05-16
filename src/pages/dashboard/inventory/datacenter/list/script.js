'use strict'

import Datacenters from 'factories/datacenters'
import ListBox from 'mixins/list-boxs'

export default {
  mixins: [ListBox],

  data: function () {
    return {
      entity: Datacenters,
      name: "Datacenter"
    }
  },

  computed: {
    MInstances () {
      return this.$parent.$refs.modal_instances
    },
    MOrphans () {
      return this.$parent.$refs.modal_orphans
    }
  }
}
