'use strict'

import _ from 'lodash'
import Modals from 'mixins/modals'
import Scheduler from 'factories/scheduler'
import Connections from 'factories/connections'
import Adminer from 'factories/adminer'
import FectherEntity from 'services/fetchEntity'

import CrontabRules from './tabs/crontab_rules.vue'
import tabTags from 'src/pages/dashboard/_modules/tabs/tab_tags'
import tabChains from 'src/pages/dashboard/_modules/tabs/tab_chains'
import tabRole from 'src/pages/dashboard/_modules/tabs/tab_input'

import headerLogin from 'src/resources/libs/headerAuthorization'

export default {
  mixins: [Modals],

  components: {
    CrontabRules,
    tabTags,
    tabChains,
    tabRole
  },

  computed: {
    tab_tags() {return this.$refs.tab_tags},
    tab_chains() {return this.$refs.tab_chains},
    tab_role() {return this.$refs.tab_role}
  },

  data () {
    return {
      status: true,
      period_type: "interval",
      module: 'webhook',
      interval: {
        period: 'minutes',
        every: 30
      },
      crontab: {
        minute: 30,
        hour: '*',
        day_of_week: '*',
        day_of_month: '*',
        month_of_year: '*'
      },
      data: {
        name: null,
        method: 'GET',
        endpoint: null,
        args: [],
        kwargs: {},
        chain: []
      },
      modules:{
        connections: {
          task: null
        }
      },
      options: {},
      showCron: false,
      mapper: [
        {name: 'max_retries', label: 'Max Retry', validate: 'min:1', help: 'Default is 3'},
        {name: 'expires', label: 'Expires', validate: 'min:1', help: 'Timeout'}
      ],
      URL:  `${new Connections().getUrl()}?query=`,
      template: '<b>{{item.name}}</b>',
      headers: headerLogin
    }
  },

  methods: {
    afterShow () {
      this.text.title =  this.create ? 'Create new Scheduler' : `Edit ${this.model.name} scheduler`
    },

    createLoad () {
      this.tabShow=0
      this.data = {}
    },

    editLoad () {
      this.$set(this, 'data', this.model)
    },

    setupModel () {
      this.model = _.pickBy(this.data, _.identity)
    },

    createSave () {
      this.setupModel()

      FectherEntity(Scheduler)()
        .create(this.finishJob, this.model)
    },

    editSave () {
      this.setupModel()

      FectherEntity(Scheduler)()
        .update(this.finishJob, this.model)
    },

    fetchData() {
      FectherEntity(Adminer)({persistence: 'local'})
        .find(this.fetchAdminer, {key: 'scheduler_options'})
    },

    getOptions() {
      return _.chain(this.options.modules)
        .filter(e => e.name == this.module)
        .head()
        .get('options')
        .value()
    },

    requestSearch(async, val, key = 'name') {
      return `${async}%7B"${key}":"${val}"%7D`
    },

    onHit(item) {
      return item.name
    }
  },

  created() {
    this.fetchData()
  }
}
