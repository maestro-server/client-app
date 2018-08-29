'use strict'

import Login from 'services/login'
import Graphs from 'factories/graphs'
import ViewSingle from 'mixins/view-single'
import analytics_url from 'src/resources/libs/analytics_url'

export default {
  mixins: [ViewSingle],

  data: function () {
    return {
      id: null,
      entity: Graphs,
      model: {name: null},
      dwn: ['svg', 'draw.io', 'png']
    }
  },

  computed: {
    src() {
      const jwt = Login.getToken();
      return `${analytics_url}/graphs/${this.id}?jwt=${jwt}`;
    }
  },

  created() {
    this.id = this.$route.params.id
  }
}

