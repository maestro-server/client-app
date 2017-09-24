'use strict'
import {mapActions} from 'vuex'
import tabMenu from '../_modules/tabMenu/tab-menu.vue'

export default {
  data () {
    return {
      submenu: {'jobs': 'Jobs', 'playbook': 'Playbooks', 'task-template': 'Task Template',
        'projects':'Projects', 'scheduler': 'Schedule', 'access-manager':'Access Manager'},
      reference: null
    }
  },

  components: {
    tabMenu
  },

  methods: {
    ...mapActions([
      'setPage'
    ])
  },

  mounted() {
    this.setPage([
      'Cloud Playbooks',
      'Setup, run, schedule and audit playbooks.',
      'icon-ansible'
    ])
  }
}
