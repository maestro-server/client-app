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
      src: null,
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
    }
  },

  methods: {
    mHeight(h) {
      const height = 10 + (h * 10);
      return `height: ${height}px`;
    },

    createUrl(ext='') {
      const jwt = Login.getToken();
      const base = new AnalyticsFront().getUrl();
      return `${base}/${this.id}?jwt=${jwt}&tmp=${ext}`;
    },

    autoRefreshSrc(data) {
      const src = this.createUrl(_.get(data, 'updated_at'))
      this.$set(this, 'src', src)
    }
  },

  created() {
    this.id = this.$route.params.id
    EventBus.$on(`analytics-${this.id}`, this.fetchData)
    this.$on('finishFetchData', this.autoRefreshSrc)
  },

  destroyed() {
    EventBus.$off(`analytics-${this.id}`, this.fetchData)
    this.$off('finishFetchData', this.autoRefreshSrc)
  }
}
