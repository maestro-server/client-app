
export default {
  CHANGE_PAGE (state, [key, val]) {
    state.viewer[key] = val
  },

  CALL_ALERT (state, args) {
    state.alert = Object.assign(state.alert, args)
  }
}
