import store from 'store'

export default (e) => {

  let data = {
    show: true,
    msg: "Houston, we have a problem ...",
    title: "Sorry, but occur a problem, contact us",
    type: "danger"
  }

  if(e.response) {
    const {response} = e
    const hash = window.location.hash


    if(response.status == 401 && hash!="#/login") {
      window.location.hash = "logout"
      return
    }

    const ch = {
      msg: response.data.title || data.msg,
      title: response.data.message || response.statusText || data.msg,
    }

    Object.assign(data, ch)
  }

  store.dispatch('callAlert', {...data})
}
