
export default {
  SET_USER (state, user) {
    state.me = Object.assign(state.me, user)
  },

  CHANGE_PAGE (state, [key, val]) {
    state.viewer[key] = val
  },

  CALL_ALERT (state, args) {
    state.alert = Object.assign(state.alert, args)
  }
}
