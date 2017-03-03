import {mapActions} from 'vuex'

export default {
  name: 'dashboard-profile',
  methods: {
    ...mapActions([
      'setTitlePage' // map this.increment() to this.$store.dispatch('increment')
    ])
  },
  mounted() {
    this.setTitlePage('Settings')
  }
}
