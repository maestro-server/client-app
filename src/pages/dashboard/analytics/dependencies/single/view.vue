<template>
  <div>

    <p class="col-xs-12 no-margin">Entry point</p>

    <div class="col-xs-12 col-sm-8 dp-container">
        <dprow v-for="item, k in grid"
          :key="k"
          :apps="item"
          :step="k"
          :parent_id="item.parent_id"
          @add="addBags"
          @sync="syncBags"
          :ref="'line_' + k"
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
  </div>
</template>


<script>
  'use strict'

  import _ from 'lodash'
  import Graphs from 'factories/graphs'
  import dprow from './modules/DpRow'
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
        nseleted: null,
        spopover: 0
      }
    },

    computed: {
      isEmpty() {
        return _.isEmpty(this.app)
      }
    },

    methods: {
      addBags(app, step) {
        this.grid[step].push(app)
      },

      syncBags(apps, step) {
        this.$set(this.grid, step, apps)
        this.grid[step].push() //vuebug, force view update
      },

      addRow(deps, step) {
        this.nseleted = step
        this.grid.splice(step+1)
        this.grid.push(deps)
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

      resetPopover() {
        this.spopover = 0
      }
    },

    created() {
      const entries = _.get(this.$route.params, 'apps', [])
      this.grid.push(entries);
    }
  }

</script>

<style src="./style.scss" lang="scss"></style>

