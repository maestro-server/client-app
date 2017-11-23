'use strict'
import Auth from 'factories/auth'
import api_url from 'src/resources/libs/api_url'
import store from 'src/store/index'

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
      const callback_url = `${api_url}/auth/changepass`;
      const data = Object.assign({}, this.model, {callback_url});

      new Auth(data, '/users/forgot/change')
        .update(this.finishCallBack)
    },

    finishCallBack() {
      let data = {
        show: true,
        title: `Plz login with your new password`,
        type: "success"
      }

      store.dispatch('callAlert', {...data})
      this.$router.push({name: 'login'})
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
