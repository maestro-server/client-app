
import User from 'factories/users'

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
      new User()
        .create({name: "Felipe"})
    }
  }

}
