import {mapActions} from 'vuex'

export default {
  methods: {
    ...mapActions([
      'setPage'
    ])
  },
  mounted() {
    this.setPage([
      'Architectures',
      'Servers and services',
      'fa-server'
    ])
  }
}
