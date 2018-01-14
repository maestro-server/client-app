'use strict'

export default {
  props: {
    single: {},
    basket: {default: ()=>[]},
    label: {type: String},
    fielder: {default: 'name'},
    showAddBtn: {default: true, type: Boolean}
  },

  data: function () {
    return {
      reseter: {}
    }
  },

  methods: {
    add() {
      const stg = _.pickBy(this.single, _.identity)
      const exist = _.find(this.basket, [this.fielder, stg[this.fielder]])

      if (!_.isEmpty(stg) && !exist) {
        this.$emit('update:single', _.clone(this.reseter))

        this.basket.push(stg)
        this.update()
      }
    },

    del(key) {
      this.basket.splice(key, 1)
      this.update()
    },

    update() {
      this.$emit('update', this.basket)
    }
  },

  mounted() {
    this.reseter = (_.clone(this.single))
  }
}
