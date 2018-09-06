<template>

  <div class="col-xs-12 text-center">
    <well>

      <h4>Choose a system/s or application to be entry point</h4>

      <a href="#" class="btn btn-default btn-sm" :class="{'btn-primary': show == 'system'}" @click.prevent="show = 'system'">by System</a>
      <a href="#" class="btn btn-default btn-sm" :class="{'btn-primary': show == 'app'}" @click.prevent="show = 'app'">by Application</a>

      <div class="row">

        <well class="col-xs-offset-3 col-xs-6 mt20 bg-white">
          <div v-if="show == 'system'">
            <tab-system @update="val => systems = val" ref="tab_system" :limit="3"></tab-system>
          </div>

          <div v-if="show == 'app'">
            <tab-apps @update="val => apps = val" ref="tab_apps">
              <template slot="label">
                <p>
                  Select entry point applications.
                </p>
              </template>
            </tab-apps>
          </div>
        </well>

      </div>

      <a href="#" class="btn btn-primary" @click.prevent="selItems">Next <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i></a>

    </well>
  </div>

</template>

<script>
  'use strict'

  import tabApps from 'src/pages/dashboard/_modules/tabs/tab_family_applications'
  import tabSystem from 'src/pages/dashboard/_modules/tabs/tab_system'

  export default {
    data() {
      return {
        show: "system",
        systems: [],
        apps: []
      }
    },

    components: {
      tabSystem,
      tabApps
    },

    computed: {
      tab_system() {return this.$refs.tab_system},
      tab_apps() {return this.$refs.tab_apps}
    },

    methods: {
      selItems() {
        let apps = this.apps;

        if (this.show == 'system')
          apps = this.getAppsBySystem();

        this.$router.push({name: 'dependency.tree', params: {apps}})
      },

      getAppsBySystem() {

      }
    }
  }

</script>

