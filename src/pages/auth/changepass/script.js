'use strict'
import Auth from 'factories/auth'
import api_url from 'src/resources/libs/api_url'

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
      const callback_url = `${api_url}/changepass`;
      const data = Object.assign({}, this.model, {callback_url});

      new Auth(data, '/users/forgot/change')
        .update()
    }
  },

  created() {
    const {query} = this.$route

    if (!query.hasOwnProperty('token')) {
      this.$router.push({name: 'forgot'})
    }

    this.model = query
  }

}
