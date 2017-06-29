import {mapActions} from 'vuex'
import modalCreate from './modalCreate/create'
import modalDelete from './modalDelete/delete'

export default {
  components: {
    modalCreate,
    modalDelete
  },

  methods: {
    ...mapActions([
      'setPage'
    ])
  },

  mounted() {
    this.setPage([
      'Applications',
      'Configs, new hosts',
      'fa-cube'
    ])
  }
}
