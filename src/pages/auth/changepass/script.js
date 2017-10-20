'use strict'
import Auth from 'factories/auth'

export default {
  name: 'changepass',

  data: function () {
    return {
      model: {
        token: undefined
      }
    }
  },

  methods: {
    changePass: function () {
      const callback_url = `${API_URL}/changepass`;
      const data = Object.assign({}, this.model, {callback_url});

      new Auth(data, '/users/forgot/change')
        .update()
    }
  },

  created() {
    const {query} = this.$route

    if (!query.hasOwnProperty('token')) {c
      this.$router.push({name: 'forgot'})
    }

    this.model = query
  }

}
