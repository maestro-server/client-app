export default {
  props: {
    list: {
      type: Object,
      default: {}
    },
    base: {
      type: String
    },
  },

  methods: {
    url (last) {
      return `/${this.base}/${  last}`
    }
  }
}
