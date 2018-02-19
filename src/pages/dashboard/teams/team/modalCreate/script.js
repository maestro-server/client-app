'use strict'

import Modals from 'mixins/modals'
import Teams from 'factories/teams'
import FectherEntity from 'services/fetchEntity'
import api_url from 'src/resources/libs/api_url'

import {EventBus} from 'src/resources/bus/bus-general.js';

export default {
  mixins: [Modals],

  data() {
    return {
      URL: `${api_url}users/autocomplete?complete=`,
      templateMembers: "{{item.name}} - <small>{{item.email}}</small>"
    }
  },

  methods: {
    afterShow() {
      this.text.title = this.create ? 'Create new Team' : `Edit ${this.model.name} team`
    },

    createSave() {
      FectherEntity(Teams)()
        .create(() => {
          this.finishJob()
          EventBus.$emit('update-teams')
        }, this.model)
    },

    editSave() {
      FectherEntity(Teams)()
        .update(() => {
          this.finishJob()
          EventBus.$emit('update-teams')
        }, this.model)
    }
  }

}
