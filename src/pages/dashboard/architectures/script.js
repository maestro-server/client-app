'use strict'
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
      'Architectures',
      'Servers and services',
      'fa-server'
    ])
  }
}
