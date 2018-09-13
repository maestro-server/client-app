'use strict'

import Modals from 'mixins/modals'
import Graphs from 'factories/graphs'
import FectherEntity from 'services/fetchEntity'
import analytics_url from 'src/resources/libs/analytics_url'

export default {
  mixins: [Modals],

  data () {
    return {
      id: null,
      data: {id: null, token: null},
      url: null
    }
  },

  computed: {
    base_url() {
      return `${analytics_url}/graphs`;
    }
  },

  methods: {
    afterShow () {
      this.text.title =  `Share with others. ${this.model.name} graph`
    },

    makeToken(token) {
      return `${this.base_url}/public/${this.id}?token=${token}`
    },

    getURL() {
      const path = `/${this.id}/public`

      FectherEntity(Graphs)({path})
      .create((e) => {
        const data = _.get(e, 'data', [])
        const url = this.makeToken(_.get(data, 'token'))
        this.$set(this, 'url', url)
      })
    }
  },

  created() {
    
    this.id = this.$route.params.id
  }

}
