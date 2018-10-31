'use strict'
import _ from 'lodash'
import Login from 'services/login'
import AnalyticsFront from 'factories/analyticsFront'
import Graphs from 'factories/graphs'
import ViewSingle from 'mixins/view-single'
import {EventBus} from "../../../../../../resources/bus/bus-general";

export default {
  mixins: [ViewSingle],

  data: function () {
    return {
      entity: Graphs,
      model: {name: null}
    }
  },

  computed: {
    typeStatus() {
      const mapp = {'finished': 'success', 'error': 'danger', 'process': 'warning'}
      return _.get(mapp, this.model.status, 'info')
    },

    filtered() {
      return _.omit(this.model, ['owner', 'roles', '_links', 'ifamilies', 'isystems', 'iclients', 'iservers', 'info.histograms'])
    },

    hist() {
      return _.get(this.model, 'info.histograms', {});
    },

    src() {
      const jwt = Login.getToken();
      const base = new AnalyticsFront().getUrl();
      return `${base}/${this.id}?jwt=${jwt}`;
    }
  },

  methods: {
    mHeight(h) {
      const height = 10 + (h * 10);
      return `height: ${height}px`;
    }
  },

  created() {
    this.id = this.$route.params.id
    EventBus.$on(`analytics-${this.id}`, this.fetchData)
  },

  destroyed() {
    EventBus.$off(`analytics-${this.id}`, this.fetchData)
  }
}
