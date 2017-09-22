'use strict'

import Modals from 'mixins/modals'
import Jobs from 'factories/jobs'
import FectherEntity from 'services/fetchEntity'

import tabTags from './tab_tags'

export default {
  mixins: [Modals],

  components: {
    tabTags,
  },

  data () {
    return {
      data: {
        name: null, description: null,
        tags: []
      },
      options: {}
    }
  },

  computed: {
    tab_tags() {return this.$refs.tab_tags}
  },

  methods: {
    afterShow () {
      this.text.title =  this.create ? 'Create new Job' : `Edit ${this.model.name} job`
    },

    createLoad () {
      this.tabShow=0
      this.data = {}
      this.tab_tags.reset()
    },

    editLoad () {
      this.$set(this, 'data', this.model)
      this.tab_tags.updaterEdit(this.model.tags)
    },

    setupModel () {
      this.model = _.pickBy(this.data, _.identity)
    },

    createSave () {
      this.setupModel()

      FectherEntity(Jobs)()
        .create(this.finishJob, this.model)
    },

    editSave () {
      this.setupModel()

      FectherEntity(Jobs)()
        .update(this.finishJob, this.model)
    }
  }

}
