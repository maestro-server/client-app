<template>
  <div>
    <div class="col-xs-8 dp-container">
      <dprow v-for="item, k in grid" :key="item._id" :apps="item" :step="k" @add="addBags"></dprow>
    </div>

    <div class="col-xs-4">
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
        grid: []
      }
    },

    methods: {
      addBags(app, step) {
        this.grid[step].push(app)
      },

      addRow(deps, step) {
        this.grid.splice(step+1)
        this.grid.push(deps)
      },

      activedApp(app) {
        let napp = _.omit(app, ['_links', 'deps', 'roles', 'owner']);
        this.$set(this, 'app', napp);
      }
    },

    created() {
      const entries = _.get(this.$route.params, 'apps', [])
      this.grid.push(entries);
      console.log(this.$route.params);
    }
  }

</script>

<style src="./style.scss" lang="scss"></style>

