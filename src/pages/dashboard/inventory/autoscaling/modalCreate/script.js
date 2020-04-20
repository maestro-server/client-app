'use strict'

import Modals from 'mixins/modals'
import ModalsApps from 'mixins/modals-apps'


export default {
  mixins: [Modals, ModalsApps],

  data () {
    return {
      family: 'AutoScaling',
      own: 1,
      initialData: {
        name: null,
        description: null,
        provider: null,
        datacenters: {},
        tags: [],
        role: { min_size: null, max_size: null, desired_capacity: null }
      },
      mapper: [
        { name: 'min_size', label: 'Min Size', type: 'number' },
        { name: 'max_size', label: 'Max Size', type: 'number' },
        { name: 'desired_capacity', label: 'Desired Capacity', type: 'number' },
        { name: 'health_check_type', label: 'Health Check Type', type: 'text', validate: 'min:2' }
      ]
    }
  }

}
