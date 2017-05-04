export default {
  name: 'login',

  data: function () {
    return {
      valid: false,
      model: {
        name: null,
        email: null,
        password: null}
    }
  },

  methods: {
    create: function () {
      console.log("fdsfds");
    }
  },

  validators: {
    checkSamePasswords: function(val) {
      return val == this.model.password;
    }
  }

}
