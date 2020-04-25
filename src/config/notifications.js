'use strict'
import iziToast from 'izitoast'

const toast = ({ title, message, type, timeout, position = 'topRight', displayMode = 2 }) => iziToast[type]({ title, message, timeout, position, displayMode })

export default {
  success: toast,
  error: toast,
  info: toast,
  warning: toast
}
