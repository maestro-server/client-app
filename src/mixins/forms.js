
// define a mixin object
export default {
  methods: {
    makeError (name) {
      return this.fields[name] && this.fields[name].dirty ? this.errors.first(name) : ''
    }
  }
}
