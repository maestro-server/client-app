'use strict'

import treeView from './TreeViewItem.vue'

export default {
  props: {
    data: {},
    title: {default: 'Info'}
  },

  components: {
    treeView
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
