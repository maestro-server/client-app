import {mapActions} from 'vuex'
import topmenu from '../_modules/top-menu/top-menu.vue'

export default {
  data () {
    return {
      submenu: {'team/': 'Teams', 'access': 'Access Roles'}
    }
  },

  methods: {
    ...mapActions([
      'setPage' // map this.increment() to this.$store.dispatch('increment')
    ])
  },

  mounted () {
    this.setPage([
      'Team',
      'Team, users and acess rules',
      'fa-users'
    ])
  },

  components: {
    'top-menu': topmenu
  }
}
