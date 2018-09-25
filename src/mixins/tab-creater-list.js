'use strict'

export default {
  props: {
    limit: {type: Number, default: 30},
  },

  data: function () {
    return {
      value: []
    }
  },

  computed: {
    isFull() {
      return this.limit <= this.value.length;
    }
  },

  methods: {
    updaterEdit(data) {
      if (data) {
        this.$set(this, 'value', data || [])
        this.$emit('update', this.value)
      }
    },

    onHit(item) {
      const exist = _.find(this.value, ['_id', item._id])

      if (!exist && !this.isFull) {
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
