'use strict'
import store from 'store'

export default () => {
  let data = {
    show: true,
    title: "Your wish was successfully conceived",
    type: "success"
  }

  store.dispatch('callAlert', {...data})
}
