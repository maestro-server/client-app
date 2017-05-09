import store from '../../store'

export default (e) => {

  if(e.response) {
    const {response} = e

    let data = {
      show: true,
      msg: response.data.title || "Houston, we have a problem ...",
      title: response.data.message || response.statusText,
      type: "danger"
    }

    store.dispatch('callAlert', {...data})
  }
}
