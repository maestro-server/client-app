'use strict'

import Datepicker from 'vue2-datepicker';

export default {
  props: {
    ofilters: {default: ()=>[]}
  },

  components: {
    Datepicker
  },

  computed: {
    isArrOrObj() {
      const ty = this.typ
      return ty === 'array' || ty === 'object'
    },

    isNumber() {
      return this.typ === 'number'
    },

    isString() {
      return this.typ === 'string'
    },

    isBoolean() {
      return this.typ === 'boolean'
    },

    isSelect() {
      return this.typ === 'select'
    },

    isDate() {
      return this.typ === 'date'
    }
  },

  data: function () {
    return {
      typ: 'string',
      field: null,
      filter: null,
      comparer: null,
      subfield: null,
      subfilter: null,
      opts: null,
      options: {
        filters: [],
        fields: [],
        comparer: [],
        cdate: ['after', 'same', 'before'],
        cstring: ['equal', 'contain', 'not contain'],
        cnumber: ['greater', 'equal', 'less'],
        cequal: ['equal'],
        subfield: []
      }
    }
  },

  methods: {
    updateFilters(items) {
      if(items) {
        this.clearAll()
        this.options.filters = items
        this.options.fields = this.options.filters.filters.map(e => `${e.key} (${e.type})`)
      }
    },

    updateTypeFilter(val) {
      this.clearFilter()

      if(val) {
        const re = /^(.*) \((.*)\)/
        const result = val.match(re)

        if (_.isArray(result) && result.length > 0) {
          const typ = result[2]
          const field = result[1]

          this.typ = typ
          this.field = field

          if (typ === 'object') {
            return this.setupObjectFilter(field, val)
          }

          if (typ === 'array') {
            return this.setupArrFilter(field, val)
          }

          if (typ === 'date') {
            return this.setupDateFilter(field, val)
          }

          if (typ === 'number') {
            return this.setupNumberFilter(field, val)
          }

          if (typ === 'boolean') {
            return this.setupBooleanFilter(field, val)
          }

          if (typ === 'select') {
            return this.setupSelectFilter(field, val)
          }

          this.options.comparer = this.options.cstring
          this.comparer = this.options.cstring[0]
        }
      }
    },

    getInternalField(field, len = '[0].leaf') {
      this.comparer = this.options.comparer[1]

      const items = this.options.filters.filters.filter(
        data => data.key === field
      )

      return _.get(items, len)
    },

    setupArrFilter(field) {
      const item = this.getInternalField(field)
      const type = _.get(item, 'type')

      if (type === 'object') {
        this.options.subfield = item.leaf
      }

      if (type === 'string') {
        this.subfield = 'value'
      }
    },

    setupObjectFilter(field) {
      const item = this.getInternalField(field)
      this.options.subfield = item
    },

    setupDateFilter() {
      this.options.comparer = this.options.cdate
      this.comparer = this.options.cdate[1]
    },

    setupNumberFilter() {
      this.options.comparer = this.options.cnumber
      this.comparer = this.options.cnumber[1]
    },

    setupSelectFilter(field) {
      const item = this.getInternalField(field, '[0].opts')
      this.opts = item
      this.options.comparer = this.options.cequal
      this.comparer = this.options.cequal[0]
    },

    setupBooleanFilter() {
      this.options.comparer = this.options.cequal
      this.comparer = this.options.cequal[0]
    },

    delItem(index) {
      this.$emit('del', index)
    },

    clearFilter() {
      this.filter = null
      this.subfield = null
      this.subfilter = null
    },

    clearAll() {
      this.field = null
      this.clearFilter()
    },

    addFilter() {
      if(this.filter || this.subfilter) {
        const picks = _.pick(this, ['field', 'filter', 'comparer', 'subfield', 'subfilter', 'typ'])
        this.$emit('submit', picks)
        this.clearAll()
      }
    }
  }
}
