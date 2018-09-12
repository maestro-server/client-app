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
    base_url() {
      return `${analytics_url}/graphs`;
    }
  },

  methods: {
    make_request(path = '') {
      const jwt = Login.getToken();
      return `${this.base_url}${path}/${this.id}?jwt=${jwt}`;
    },

    down({url, type, ext}) {
      const name = `${this.id}.${ext}`

      axios({
        url,
        responseType: 'arraybuffer'
      })
        .then(function (response) {
          let blob = new Blob([response.data], {type})
          let link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.setAttribute('download', name);
          link.click()
        });
    },

    setUrls() {
      this.dwn = [{
        'label': 'svg',
        'ext': 'svg',
        'url': this.make_request() + '&ext=svg',
        'type': 'application/svg+xml'
      }, {
        'label': 'graph.io',
        'ext': 'xml',
        'url': this.make_request() + '&ext=xml',
        'type': 'application/xml'
      }, {
        'label': 'png',
        'ext': 'png',
        'url': this.make_request('/png'),
        'type': 'image/png'
      }]
    }
  },

  created() {
    this.id = this.$route.params.id
    this.setUrls()
  }
}

