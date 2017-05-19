import store  from 'store'

export default {

  computed: {
    title: () => store.getters.call_alert.title,

    msg: () => store.getters.call_alert.msg,

    type: () => store.getters.call_alert.type,

    showTop: {
      get () {
        return store.getters.call_alert.show
      },
      set (show) {
        store.dispatch('callAlert', {show})
      }
    }

  }
}
