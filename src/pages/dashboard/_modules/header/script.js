export default {
  name: 'header',
  computed: {
    title () {
      return this.$store.getters.get_title_page
    }
  }
}
