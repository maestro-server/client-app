'use strict'

import _ from 'lodash'
import Modals from 'mixins/modals'
import ModalsForeignRelation from 'mixins/modals-foreign-relation'

import System from 'factories/system'
import Applications from 'factories/applications'

import tabFamilyApps from 'src/pages/dashboard/_modules/tabs/tab_family_applications'


export default {
  mixins: [Modals, ModalsForeignRelation],

  components: {
    tabFamilyApps
  },

  computed: {
    tabRef () {
      return this.$refs.tab_family
    }
  },

  data () {
    return {
      entity: System,
      relation: Applications,
      fielder: 'list_apps',
      type: "Application"
    }
  },

  methods: {
    transformValue (val) {
      if (_.isArray(val)) {
        const tval = val.map(e => e._id)
        this.$set(this, 'value', tval)
      }
    }
  }

}
