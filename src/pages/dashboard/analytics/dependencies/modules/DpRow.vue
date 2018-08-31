<template>
  <div class="dp-wrapper">
    <div class="dp-row">
      <dpbox v-for="app, k in apps" :key="k" :name="app.name" :family="app.family" :environment="app.environment" :id="app._id"></dpbox>
    </div>

    <popover effect="scale" placement="top" title="Add Application">

      <template slot="content">

        <typeahead label=""
                   placeholder="MyWebApp"
                   :async="URL"
                   async-key="items"
                   :onSearch="requestSearch"
                   :template="template"
                   :on-hit="onHit"
                   class="col-xs-12"
                   :headers="headers"
        ></typeahead>

      </template>

      <a class="more more-right">+</a>
    </popover>
  </div>

</template>

<script>
  'use strict'

  import _ from 'lodash'
  import dpbox from './DpBox'
  import Applications from 'factories/applications'
  import headerLogin from 'src/resources/libs/headerAuthorization'

  export default {
    props: {
      step: {type: Number, default: 0},
      apps: {type: Array, default: () => []}
    },

    components: {
      dpbox
    },

    data: function () {
      return {
        type: "Application",
        URL: `${new Applications().getUrl()}?query=`,
        template: "<b>{{item.name}}</b> <span v-if='item.environment'>({{item.environment}})</span> <h5 class='ft15 inline'><bs-label type='default' v-if='item.role'>{{item.role.role}}</bs-label></h5>",
        headers: headerLogin,
        bags: []
      }
    },

    methods: {
      requestSearch(async, val, key = 'name') {
        return `${async}%7B"${key}":"${val}"%7D`
      },

      onHit(item) {
        const exist = _.find(this.bags, ['_id', item._id])

        if (!exist) {
          const app = _.pick(item, ['_id', 'name', 'family', 'environment']);
          this.$emit('add', app, this.step)
        }
      },

      addRow(data) {
        this.$parent.addRow(_.get(data, 'deps', []), this.step)
        this.$parent.activedApp(data)
      }
    },

    created() {
      this.$set(this, 'bags', this.apps)
    }
  }
</script>
