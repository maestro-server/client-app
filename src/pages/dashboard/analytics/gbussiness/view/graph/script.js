'use strict'


import Login from 'services/login'
import Graphs from 'factories/graphs'
import ViewSingle from 'mixins/view-single'
import analytics_url from 'src/resources/libs/analytics_url'
import download_file from 'src/resources/requests/download_request'

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
      download_file(name, url, type)
    },

    setUrls() {
      this.dwn = [{
        'label': 'svg',
        'ext': 'svg',
        'url': this.make_request() + '&ext=svg',
        'type': 'application/svg+xml'
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

