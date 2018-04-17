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
    const initData = {
      name: null,
      method: 'GET',
      endpoint: null,
      args: [],
      kwargs: {},
      chain: []
    }

    return {
      enabled: true,
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
      initialData: initData,
      data: initData,
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
      template: "<b>{{item.name}}</b>",
      headers: headerLogin
    }
  },

  methods: {
    afterShow () {
      this.text.title =  this.create ? 'Create new Scheduler' : `Edit ${this.model.name} scheduler`
    },

    createLoad () {
      this.tabShow=0
      this.data = _.clone(this.initialData)

      this.tab_tags.reset()
      this.tab_chains.reset()
      this.tab_role.reset()
    },

    editLoad () {
      this.$set(this, 'data', this.model)
      this.$set(this, 'enabled', this.model.enabled)
      this.$set(this, 'period_type', this.model.period_type)
      this.$set(this, 'module', this.model.module)
      this.$set(this, this.period_type, _.get(this.model, this.period_type))

      this.tab_tags.updaterEdit(this.model.args)
      this.tab_chains.updaterEdit(this.model.chain)
      this.tab_role.updaterEdit(this.model.kwargs)
    },

    setupModel () {
      console.log(this.model)
      this.model = _.pickBy(this.data, _.identity)
      this.$set(this.model, 'module', this.module)
      this.$set(this.model, 'enabled', this.enabled)
      this.$set(this.model, 'period_type', this.period_type)
      this.$set(this.model, 'kwargs', _.pickBy(_.get(this, 'data.kwargs'), _.identity))
      this.$set(this.model, this.period_type, _.get(this, this.period_type))
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
