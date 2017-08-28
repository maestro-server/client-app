'use strict'
import store from 'src/store'

export default () => {
  let data = {
    show: true,
    title: "Your wish was successfully conceived",
    msg: "Date saved successfully",
    type: "success"
  }

  store.dispatch('callAlert', {...data})
}
