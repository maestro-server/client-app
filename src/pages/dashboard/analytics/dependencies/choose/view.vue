<template>
  <div class="col-xs-12 text-center">
    <well>
      <h4>Choose a system/s or application to be entry point</h4>

      <a
        href="#"
        class="btn btn-default btn-sm"
        :class="{'btn-primary': show == 'system'}"
        @click.prevent="show = 'system'"
      >by System</a>
      <a
        href="#"
        class="btn btn-default btn-sm"
        :class="{'btn-primary': show == 'app'}"
        @click.prevent="show = 'app'"
      >by Application</a>

      <div class="row">
        <well class="col-sm-offset-3 col-sm-6 col-xs-12 mt20 bg-white">
          <div v-if="show == 'system'">
            <tab-system
              ref="tab_system"
              :limit="3"
              @update="val => systems = val"
            />
          </div>

          <div v-if="show == 'app'">
            <tab-apps
              ref="tab_apps"
              @update="val => apps = val"
            >
              <template slot="label">
                <p>
                  Select entry point applications.
                </p>
              </template>
            </tab-apps>
          </div>
        </well>
      </div>

      <a
        href="#"
        class="btn btn-primary"
        @click.prevent="selItems"
      >Next <i
        class="fa fa-arrow-circle-o-right"
        aria-hidden="true"
      /></a>
    </well>
  </div>
</template>

<script>
  'use strict'

  import System from 'factories/system'
  import FectherEntity from 'services/fetchEntity'
  import tabApps from 'src/pages/dashboard/_modules/tabs/tab_family_applications'
  import tabSystem from 'src/pages/dashboard/_modules/tabs/tab_system'

  export default {

    components: {
      tabSystem,
      tabApps
    },
    data() {
      return {
        show: "system",
        systems: [],
        apps: []
      }
    },

    computed: {
      tab_system() {
        return this.$refs.tab_system
      },
      tab_apps() {
        return this.$refs.tab_apps
      }
    },

    methods: {
      selItems() {
        if (this.show == 'system') {
          this.getAppsBySystem(this.systems);
        } else {
          this.routePage(this.apps);
        }
      },

      getAppsBySystem(dsystems) {
        const _id = dsystems.map(e => _.get(e, '_id'));

        if (_id.length > 0) {
          FectherEntity(System)({force: true})
            .find(this.fetchApps, {_id});
        }
      },

      fetchApps(data) {
        const items = _.get(data, 'data.items', []);
        const entries = items.reduce((arr, sys) => _.concat(arr, _.get(sys, 'entry', [])), []);
        const apps = _.uniqBy(entries, '_id');
        this.routePage(apps);
      },

      routePage(apps) {
        const systems = this.systems
        this.$router.push({name: 'dependency.tree', params: {systems, apps}})
      }
    }
  }

</script>
