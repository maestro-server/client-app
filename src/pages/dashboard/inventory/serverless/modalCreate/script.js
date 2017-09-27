'use strict'

import Modals from 'mixins/modals'
import ModalsApps from 'mixins/modals-apps'

export default {
  mixins: [Modals, ModalsApps],

  data () {
    return {
      family: 'Serverless',
      own: 1,
      initialData: {
        name: null, description: null, provider:null,
        tags: [], servers: [], targets: [],
        role: {language: null}
      },
      mapper: [
        {name: 'memory', label: 'Memory (MB)', validate: 'alpha_num'},
        {name: 'timeout', label: 'Timeout', validate: 'min:2'},
        {name: 'trigger', label: 'Triggers', type: 'textarea', validate: 'min:2'},
        {name: 'handler', label: 'Handler', validate: 'min:2'},
      ]
    }
  }
}
