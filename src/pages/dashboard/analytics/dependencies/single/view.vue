<template>
  <div>

    <p class="col-xs-12 no-margin">Entry point</p>

    <div class="col-xs-12 col-sm-8 dp-container">
        <dprow v-for="item, k in grid"
          :key="k"
          :apps="item"
          :step="k"
          :ref="'line_' + k"
          :parent_id="item.parent_id"
          @addRow="addRow"
          @deleteRow="deleteRow"
          @commitItem="commitItem"
          >
          </dprow>
    </div>

    <div class="col-sm-4 hidden-xs">
      <well v-if="isEmpty">
        <h4 class="primary">
          <i class="fa fa-question-circle" aria-hidden="true"></i>
          <strong>Tips</strong>
        </h4>

        <ul class="no-pad">
          <li>Can create a dependency tree between all applications.</li>
          <li>Select and active any app, after clicking on the plus and add any dependency.</li>
          <li>Dependency tree its used to created business graphs, a relation between apps and services.</li>
        </ul>
      </well>

      <info-view :data="app" :title="false"></info-view>
    </div>

    <div class="btn-fixed text-center" :class="{'btn-fixed-hidden': isEmpty}">
      <button class="btn btn-primary" @click="save">Commit - Tree Dependency</button>
    </div>
  </div>
</template>


<script>
  'use strict'

  import _ from 'lodash'
  import Graphs from 'factories/graphs'
  import dprow from './modules/DpRow'
  import FectherEntity from 'services/fetchEntity'
  import Applications from 'factories/applications'
  import tabApps from 'src/pages/dashboard/_modules/tabs/tab_family_applications'
  import tabSystem from 'src/pages/dashboard/_modules/tabs/tab_system'

  export default {

    components: {
      tabSystem,
      tabApps,
      dprow
    },

    data() {
      return {
        entity: Graphs,
        app: {},
        grid: [],
        spopover: 0,
        tracker: {}
      }
    },

    computed: {
      isEmpty() {
        return _.isEmpty(this.app)
      }
    },

    methods: {
      addRow(id, step) {
        FectherEntity(Applications)()
          .findOne((e) => {
            const data = _.get(e, 'data', [])
            this.activedApp(data)
            const deps = this.getDeps(id, data)
            this.appendRow(deps, step)
          }, id)
      },

      getDeps(id, data={}) {
        if(!_.has(this.tracker, id)) {
          return _.get(data, 'deps', [])
        }
        return _.get(this.tracker, id)
      },

      appendRow(deps, step) {
        this.grid.splice(step+1)
        this.grid.push(deps)
      },

      deleteRow(id, step) {
        _.remove(this.grid[step], e => e._id == id)
        this.grid[step].push() //vuebug, force view update
        this.updateTracker(step, this.grid[step])
      },

      commitItem(app, step) {
        this.grid[step].push(app)
        this.updateTracker(step, this.grid[step])
      },

      updateTracker(step, row) {
        const id = _.get(this.app, '_id', 'root')
        this.tracker[id] = row
      },

      activedApp(app) {
        let napp = _.omit(app, ['_links', 'deps', 'roles', 'owner']);
        this.$set(this, 'app', napp);
      },

      activedPopover(step) {
        const opop = this.spopover
        this.spopover = step
        const isShow = _.get(this.$refs['line_'+opop][0].$refs['pop'], 'show', false)

        if(isShow && opop != step) {
          this.$refs['line_'+opop][0].$refs['pop'].toggle()
        }
      },

      save() {
        const uri = `/deps`;
        FectherEntity(Applications)({path: uri})
            .create(this.finishJob, this.tracker);
      }
    },

    created() {
      const entries = _.get(this.$route.params, 'apps', [])
      this.grid.push(entries);
    }
  }

</script>

<style src="./style.scss" lang="scss"></style>