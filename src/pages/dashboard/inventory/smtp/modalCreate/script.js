'use strict'

import Modals from 'mixins/modals'
import ModalsApps from 'mixins/modals-apps'


export default {
  mixins: [Modals, ModalsApps],

  data () {
    return {
      family: 'SMTP',
      initialData: {
        name: null, description: null, provider:null, datacenters: {},
        tags: [], role: {endpoint: null}
      },
      mapper: [
        {name: 'endpoint', label: 'Endpoint', validate: 'url'},
        {name: 'extra_config', label: 'Extra Configs', type: "textarea", validate: 'min:2'}
      ]
    }
  }

}
