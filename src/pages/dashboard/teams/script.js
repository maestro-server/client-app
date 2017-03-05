import {mapActions} from 'vuex'
import topmenu from '../_modules/top-menu/top-menu.vue'

export default {
  data () {
    return {
      submenu: {'create': 'Create a team', 'billing': 'Billing'}
    }
  },

  methods: {
    ...mapActions([
      'setPage' // map this.increment() to this.$store.dispatch('increment')
    ])
  },

  mounted () {
    this.setPage([
      'Settings',
      'Profile, plan and billing',
      'fa-user'
    ])
  },

  components: {
    'top-menu': topmenu
  }
}
