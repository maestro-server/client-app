'use strict'

import Modals from 'mixins/modals'
import Graphs from 'factories/graphs'
import FectherEntity from 'services/fetchEntity'
import AnalyticsFront from 'factories/analyticsFront'

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
      return new AnalyticsFront().setEntity('graphs').getUrl();
    },

    status() {
      return _.get(this.model, 'spublic') ? 'on' : 'off'
    }
  },

  methods: {
    afterShow () {
      this.text.title =  `Share with others. ${this.model.name} graph`
    },

    makeToken(token) {
      return `${this.base_url}/public/${this.id}?token=${token}`
    },

    putOn() {
      this.requestT({}, (e) => {
        const url = this.makeToken(_.get(e, 'data.token'))
        this.$set(this, 'url', url)
      })
    },

    putOff() {
      this.requestT({'public': false}, () => {
        this.$set(this, 'url', null)
        this.$set(this, 'model.spublic', false)
      })
    },

    requestT(body, fnc) {
      const path = `/${this.id}/public`

      FectherEntity(Graphs)({path})
        .create(fnc, body)
    }
  },

  created() {
    this.id = this.$route.params.id
  }

}
