<template>
  <div>
<p class="col-xs-12 no-margin">
Entry point
</p>

    <div class="col-xs-12 col-sm-8 dp-container">
      <dprow
v-for="item, k in grid"
             :key="k"
             :ref="'line_' + k"
             :apps="item"
             :step="k"
             :parent_id="item.parent_id"
             :types="options.protocol"
             @addRow="addRow"
             @deleteItem="deleteItem"
             @deleteRow="deleteRow"
             @commitItem="commitItem"
      />
    </div>

    <div class="col-sm-4 hidden-xs">
      <well v-if="isEmpty">
        <h4 class="primary">
          <i
class="fa fa-question-circle"
aria-hidden="true"
/>
          <strong>Tips</strong>
        </h4>

        <ul class="no-pad">
          <li>Can create a dependency tree between all applications.</li>
          <li>Select and active any app, after clicking on the plus and add any dependency.</li>
          <li>Dependency tree its used to created business graphs, a relation between apps and services.</li>
        </ul>
      </well>

      <info-view
:data="app"
:title="false"
/>
    </div>

    <div
class="btn-fixed text-center"
:class="{'btn-fixed-hidden': isEmpty}"
>
      <button
class="btn btn-primary"
@click="save"
>
Commit - Tree Dependency
</button>
    </div>
  </div>
</template>


<script>
'use strict'

import _ from 'lodash'
import Graphs from 'factories/graphs'
import dprow from './modules/DpRow'
import Adminer from 'factories/adminer'
import FectherEntity from 'services/fetchEntity'
import Applications from 'factories/applications'
import tabApps from 'src/pages/dashboard/_modules/tabs/tab_family_applications'
import tabSystem from 'src/pages/dashboard/_modules/tabs/tab_system'
import formatAdminer from 'src/resources/libs/formatAdminerData'
import fsuccess from 'src/resources/callbacks/request_success'

export default {

  components: {
    tabSystem,
    tabApps,
    dprow
  },

  data () {
    return {
      show: 'app',
      entity: Graphs,
      app: {},
      grid: [],
      spopover: 0,
      tracker: {},
      actived: [],
      options: {
        protocol: [],
        protocol_broker: [],
        protocol_default: []
      }
    }
  },

  computed: {
    isEmpty () {
      return _.isEmpty(this.app)
    }
  },

  created () {
    this.resetTree()
    const entries = _.get(this.$route.params, 'apps', [])
    this.grid.push(entries)
    this.systems = _.get(this.$route.params, 'systems')
    this.fetchData();
  },

  methods: {
    addRow (id, step) {
      FectherEntity(Applications)({ persistence: 'vuex' })
        .findOne((e) => {
          const data = _.get(e, 'data', [])
          this.activedApp(data, step)
          const deps = this.getDeps(id, data)
          this.appendRow(deps, step)
        }, id)
    },

    getDeps (id, data = {}) {
      if (!_.has(this.tracker, id)) {
        return _.get(data, 'deps', [])
      }
      return _.get(this.tracker, id)
    },

    appendRow (deps, step) {
      this.grid.splice(step + 1)
      this.grid.push(deps)
    },

    deleteItem (id, step) {
      _.remove(this.grid[step], e => e._id === id)
      this.grid[step].push() // vuebug, force view update
      this.updateTracker(step, this.grid[step])
    },

    deleteRow (step) {
      this.grid = _.slice(this.grid, 0, step);
    },

    commitItem (app, step) {
      const exist = _.find(this.grid[step], ['_id', app._id])
      if (!exist) {
        this.grid[step].push(app)
        this.updateTracker(step, this.grid[step])
      }
    },

    updateTracker (step, app) {
      const id = _.get(this.actived, `[${step - 1}]._id`, 'root')
      this.tracker[id] = app
    },

    activedApp (app, step) {
      const napp = _.omit(app, ['_links', 'deps', 'roles', 'owner'])
      this.$set(this, 'app', napp)
      this.actived[step] = napp
    },

    activedPopover (step) {
      const opop = this.spopover
      this.spopover = step
      const line = `line_${opop}[0].$refs.pop`

      const refs = _.get(this.$refs, line)
      if (refs && opop !== step) {
        const isShow = _.get(refs, 'show', false)
        if (isShow) { refs.toggle() }
      }
    },

    save () {
      const uri = `/deps`;
      FectherEntity(Applications)({ path: uri })
        .create(fsuccess, { tree: this.tracker, systems: this.systems })
    },

    fetchData () {
      FectherEntity(Adminer)({ persistence: 'local' })
        .find(this.fetchAdminer, { key: 'deps_options' })
    },

    fetchAdminer (e) {
      const opts = formatAdminer(e)
      const protocol = _.reduce(opts, (opt, val) => opt.concat(val), [])
      this.$set(this.options, 'protocol', _.uniq(protocol))
    },

    resetTree () {
      this.$set(this, 'tracker', {})
      this.$set(this, 'actived', [])
      this.$set(this, 'spopover', 0)
      this.$set(this, 'grid', [])
      this.$set(this, 'app', {})
    }
  }
}

</script>

<style src="./style.scss" lang="scss"></style>
