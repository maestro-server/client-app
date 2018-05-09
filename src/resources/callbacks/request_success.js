'use strict'
import {EventBus} from 'src/resources/bus/bus-general.js'

export default () => {
  let data = {
    show: true,
    title: "Your wish was successfully conceived",
    msg: "Date saved successfully",
    type: "success"
  }

  EventBus.$emit('call-notify', data)
}
