'use strict'
import iziToast from 'izitoast'

const toast = ({ title, message, type, timeout, position = 'topRight' }) => iziToast[type]({ title, message, timeout, position })

export default {
  success: toast,
  error: toast,
  info: toast,
  warning: toast
}
