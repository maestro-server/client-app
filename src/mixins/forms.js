
// define a mixin object
export default {
  methods: {
    makeError (name, scope=null, force=true) {
      let ff = this.fields
      let str = name

      if(scope) {
        const aa = '$'+scope

        if(ff[aa]) {
          str = `${scope}.${name}`
          ff = ff[aa]
        }
      }

      return force && ff[name] && ff[name].dirty ? this.errors.first(str) : ''
    }
  }
}
