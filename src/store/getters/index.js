'use strict'
export default {
  get_page: state => state.viewer,
  call_alert: state => state.alert,
  get_me: state => state.me,
  get_version: state => state.version,
  get_spinner: state => state.spinner,
  get_cache: state => state.cache,
  get_options: state => state.options
}
