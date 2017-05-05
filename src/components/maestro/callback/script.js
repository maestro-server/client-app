
export default {
  props: {
    title: {type: String},
    msg: {type: String}
  },

  data: () => {
    return {
      showTop: true
    }
  },

  computed: {
    title: () => {
      return "ohhh"
    },

    msg: () => {
      return "ohhhh"
    }
  }
}
