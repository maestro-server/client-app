
export default {
  setPage ({commit}, [title, subtitle = null, icon = null]) {
    commit('CHANGE_PAGE', ['title', title])
    commit('CHANGE_PAGE', ['subtitle', subtitle])
    commit('CHANGE_PAGE', ['icon', icon])
  }
}
