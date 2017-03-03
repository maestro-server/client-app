
export default {
  setPage ({commit}, [title, subtitle = null, icon = null]) {
    commit('CHANGE_TITLE_PAGE', title)
    commit('CHANGE_SUBTITLE_PAGE', subtitle)
    commit('CHANGE_ICON_PAGE', icon)
  }
}
