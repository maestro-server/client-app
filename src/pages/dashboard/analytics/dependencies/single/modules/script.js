'use strict'

import _ from 'lodash'
import Applications from 'factories/applications'
import headerLogin from 'src/resources/libs/headerAuthorization'

export default {
  props: {
    step: {
      type: Number,
      default: 0
    },
    parent_id: { type: String },
    apps: {
      type: Array,
      default: () => []
    },
    types: {
      type: Array,
      default: () => []
    }
  },

  data: function () {
    return {
      type: 'Application',
      URL: `${new Applications().getUrl()}?query=`,
      template:
        '<b>{{item.name}}</b> <span v-if=\'item.environment\'>({{item.environment}})</span> <h5 class=\'ft15 inline\'><bs-label type=\'default\' v-if=\'item.role\'>{{item.role.role}}</bs-label></h5>',
      headers: headerLogin,
      bags: [],
      app: {},
      selected: null,
      endpoint: null,
      options: {
        protocol: []
      }
    }
  },

  computed: {
    wLine () {
      const wid = this.apps.length ? (this.apps.length - 1) * 120 + 2 : 0
      return `width: ${wid}px`
    }
  },

  methods: {
    addItem (id) {
      this.$emit('addRow', id, this.step)
      this.$set(this, 'selected', id)
    },

    delItem (id) {
      this.$emit('deleteItem', id, this.step)

      if (id === this.selected) {
        this.$emit('deleteRow', this.step + 1)
      }
    },

    requestSearch (async, val, key = 'name') {
      return `${async}%7B"${key}":"${val}"%7D`
    },

    onHit (item) {
      const app = _.pick(item, ['_id', 'name', 'family', 'environment'])
      this.$set(this, 'app', app)
    },

    onCommit () {
      if (_.has(this.app, '_id')) {
        const tapp = _.assign(this.app, { endpoint: this.endpoint })
        this.$emit('commitItem', tapp, this.step)
        this.clear()
      }
    },

    clear () {
      this.app = {}
      this.endpoint = null
    }
  },

  created () {
    this.$set(this, 'bags', this.apps)
  }
}
