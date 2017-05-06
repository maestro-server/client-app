import store from '../../store'

export default (e) => {

  if(e.response) {

    let data = {
      title: "ops",
      msg: "ok",
      type: "danger"
    }

    store.dispatch('callAlert', {...data})
    console.log(e.response)
  }
}
