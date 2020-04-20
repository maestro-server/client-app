'use strict'
import { EventBus } from 'src/resources/bus/bus-general.js'

export default (custom = {}) => {
  const data = {
    show: true,
    title: "Your wish was successfully conceived",
    msg: "Date saved successfully",
    type: "success"
  }

  _.assign(data, custom)
  EventBus.$emit('call-notify', data)
}
