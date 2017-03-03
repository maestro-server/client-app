
export default {
  CHANGE_TITLE_PAGE (state, title) {
    state.viewer.title = title
  },

  CHANGE_SUBTITLE_PAGE (state, sub) {
    state.viewer.subtitle = sub
  },

  CHANGE_ICON_PAGE (state, icon) {
    state.viewer.icon = icon
  }
}
