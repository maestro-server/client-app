'use strict'

import axios from 'axios'
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
      dwn: []
    }
  },

  computed: {
    src() {
      const jwt = Login.getToken();
      return `${analytics_url}/graphs/${this.id}?jwt=${jwt}`;
    }
  },

  methods: {
    down(url) {
      axios({
        url:url,
        responseType:'arraybuffer'
      })
        .then(function(response) {
          let blob = new Blob([response.data], { type:   'application/pdf' } )
          let link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.click()
      });
    }, 

    setUrls() {
      this.dwn = [{
        'label': 'svg',
        'link': this.src + '&ext=svg',
        'type': 'application/svg+xml'
      }, {
        'label': 'graph.io',
        'link': this.src + '&ext=xml',
        'type': 'application/xml'
      }, {
        'label': 'png',
        'link': this.src + '&ext=png',
        'type': 'image/png'
      }]
    }
  },

  created() {
    this.id = this.$route.params.id
    this.setUrls()
  }
}

