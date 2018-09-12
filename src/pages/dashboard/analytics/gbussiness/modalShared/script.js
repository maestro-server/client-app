'use strict'

import Modals from 'mixins/modals'

export default {
  mixins: [Modals],

  data () {
    return {
      data: {name: null}
    }
  },

  methods: {
    afterShow () {
      this.text.title =  `Share with others. ${this.model.name} graph`
    }

  }

}
