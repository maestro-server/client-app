'use strict'
export default {
  props: {
    data: {}
  },

  methods: {
    isObject: function (value) {
      return _.isPlainObject(value);
    },

    isArray: function (value) {
      return _.isArray(value);
    },

    isString: function (value) {
      return _.isString(value);
    }
  }
}
