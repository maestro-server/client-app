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

import headerLogin from 'src/resources/libs/headerAuthorization'

export default {
  mixins: [Modals],

  components: {
    CrontabRules,
    tabTags,
    tabChains
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
      period_type: "interval",
      args: [],
      task: 'webhook',
      link:{
        name: '',
        _id: '',
        task: null
      },
      chain: [],
      max_run_count: 0
    }

    const initCronTab = {
      minute: 30,
      hour: '*',
      day_of_week: '*',
      day_of_month: '*',
      month_of_year: '*'
    }

    const initInterval = {
      period: 'minutes',
      every: 30
    }

    return {
      enabled: true,
      initialData: initData,
      initialCron: initCronTab,
      initialInterval: initInterval,
      data: _.clone(initData),
      interval: _.clone(initInterval),
      crontab: _.clone(initCronTab),
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
      this.$set(this, 'data', _.clone(this.initialData))
      this.$set(this, 'crontab', _.clone(this.initialCron))
      this.$set(this, 'interval', _.clone(this.initialInterval))
      this.$set(this, 'enabled', true)

      this.tab_tags.reset()
      this.tab_chains.reset()
      this.$nextTick()
    },

    editLoad () {
      this.tabShow=0
      this.$set(this, 'data', _.assign({}, this.initialData, this.model))
      this.$set(this.data, 'endpoint', _.get(this.model, 'endpoint'))
      this.$set(this, 'enabled', _.get(this.model, 'enabled'))
      this.$set(this, this.data.period_type, _.get(this.model, this.data.period_type))

      this.tab_tags.updaterEdit(this.model.args)
      this.tab_chains.updaterEdit(this.model.chain)
      this.$nextTick()
    },

    setupModel () {
      const period = this.data.period_type

      this.model = _.pickBy(this.data, _.identity)
      this.$set(this.model, 'enabled', this.enabled)
      this.$set(this.model, 'link', _.pickBy(_.get(this, 'data.link'), _.identity))
      this.$set(this.model, period, _.get(this, period))

      const remove = _.chain(this.options)
        .get('period_type')
        .filter(e=>e!=period)
        .push('msg')
        .value()

      this.$set(this, 'model', _.omit(this.model, remove))
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
      return _.chain(this.options.configs)
        .filter(e => e.name == _.get(this.data, 'task'))
        .head()
        .get('options')
        .keys()
        .value()
    },

    requestSearch(async, val, key = 'name') {
      return `${async}%7B"${key}":"${val}"%7D`
    },

    onHit(item) {
      this.$set(this.data.link, '_id', _.get(item, '_id'))
      this.$set(this.data.link, 'provider', _.get(item, 'provider'))
      this.connectionSwap()
      return item.name
    },

    connectionSwap() {
      const pre = _.pickBy(this.data.link, _.identity)

      if(_.has(pre, 'provider') && _.has(pre, '_id') &&  _.has(pre, 'task') && !_.get(this, 'data.endpoint')) {
        let conn = _.chain(this.options.configs)
          .filter(e => e.name == _.get(this.data, 'task'))
          .head()
          .pick(['url', 'method'])
          .value()

        this.data.endpoint = _.chain(this.data.link)
                .pick(['provider', '_id', 'task'])
                .reduce((result, value, key) => _.replace(result, `<${key}>`, value), _.get(conn, 'url'))
                .value()

        this.data.method = _.get(conn, 'method')
      }
    }
  },

  created() {
    this.fetchData()
  }
}
