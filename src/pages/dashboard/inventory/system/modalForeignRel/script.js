'use strict'

import Modals from 'mixins/modals'
import ModalsForeignRelation from 'mixins/modals-foreign-relation'

import System from 'factories/system'
import Adminer from 'factories/adminer'
import FectherEntity from 'services/fetchEntity'

export default {
  mixins: [Modals, ModalsForeignRelation],

  data() {
    return {
      entity: System,
      relation: 'applications',
      label: 'Applications',
      fielder: 'list_apps',
      options: {
        apps: []
      },
      type: "Application",
      template_apps: "<b>{{item.name}}</b> <span v-if='item.environment'>({{item.environment}})</span> <h5 class='ft15 inline'><bs-label type='default' v-if='item.role'>{{item.role.role}}</bs-label></h5>"
    }
  },

  methods: {
    requestSearch(async, val, key = 'name') {
      return `${async}%7B"${key}":"${val}", "family":"${this.type}"%7D`
    }
  },

  created() {
    FectherEntity(Adminer)({persistence: 'local'})
      .find(this.fetchAdminer, {key: 'system_options'})
  }

}
