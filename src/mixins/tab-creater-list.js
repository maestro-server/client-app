'use strict'

export default {
  data: function () {
    return {
      value: []
    }
  },

  methods: {
    updaterEdit(data) {
      this.$set(this, 'value', data || [])
      this.$emit('update', this.value)
    },

    onHit(item) {
      const exist = _.find(this.value, ['_id', item._id])

      if (!exist) {
        const getters = _.isArray(this.filter) ? _.pick(item, this.filter) : item
        this.value.push(getters)
        this.updaterEdit(this.value)
      }
    },

    reset() {
      this.value = []
    }
  }
}
