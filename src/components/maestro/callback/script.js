import store  from '../../../store'

export default {
  store,
  data: () => {
    return {
      showTop: true
    }
  },

  computed: {
    title: () => {
      return store.getters.call_alert.title
    },

    msg: () => {
      return store.getters.call_alert.msg
    },

    type: () => {
      return store.getters.call_alert.type
    }

  }
}
