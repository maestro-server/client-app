export default {
  name: 'header',
  computed: {
    page () {
      return this.$store.getters.get_page
    }
  }
}
