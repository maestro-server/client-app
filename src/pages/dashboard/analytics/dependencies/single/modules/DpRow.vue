<template>
  <div class="dp-wrapper">

    <div class="dp-lines-t" :style="wLine"></div>

    <div class="dp-row">

        <div class="dp-item" 
            :class="{'dp-select': app._id == selected}" 
            @click="add(app._id)" 
            v-for="app, k in apps" 
            :key="app._id">
            
          <h5>{{app.name}}</h5>
          <p v-if="app.family"><span class="dst">{{app.family}}</span></p>
          <p v-if="app.environment"><span class="dst">{{app.environment}}</span></p>

          <a class="more more-del" @click.stop.prevent="delItem(app._id)">X</a>
        </div>

      <well class="bg-white" v-if="apps.length == 0">
          Select the first dependency
      </well>

    </div>

    <bs-label type="default" class="pull-right mt5">{{step}}</bs-label>

    <div class="dp-lines-b" :style="wLine"></div>

    <popover effect="scale" placement="top" title="Add Dependecy" :ref="'pop_' + step">

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
  import Applications from 'factories/applications'
  import FectherEntity from 'services/fetchEntity'
  import CacheManager from 'services/cacheManager'
  import headerLogin from 'src/resources/libs/headerAuthorization'

  export default {
    props: {
      step: {type: Number, default: 0},
      parent_id: {type: String},
      apps: {type: Array, default: () => []}
    },

    data: function () {
      return {
        type: "Application",
        URL: `${new Applications().getUrl()}?query=`,
        template: "<b>{{item.name}}</b> <span v-if='item.environment'>({{item.environment}})</span> <h5 class='ft15 inline'><bs-label type='default' v-if='item.role'>{{item.role.role}}</bs-label></h5>",
        headers: headerLogin,
        bags: [],
        selected: null
      }
    },

    computed: {
      wLine() {
         let wid = 0

        if (this.apps.length) {
          wid = ((this.apps.length -1) * 120) + 2
        }

        return `width: ${wid}px`
      }
    },

    methods: {
      changeSelected(id) {
        this.$set(this, 'selected', id)
      },

      add(id) {
        this.changeSelected(id)

        FectherEntity(Applications)()
          .findOne((e) => {
            const data = _.get(e, 'data', [])
            this.addRow(data)
          }, id)
      },

      delItem(_id) {
        const uri = `/${this.parent_id}/deps`;

        FectherEntity(Applications)({path: uri})
          .remove(() => {
            _.remove(this.bags, e => e._id == _id)
            this.$emit('sync', this.bags, this.step)
            CacheManager({k: `applications_${this.parent_id}`}).remove()
          }, {_id});
      },

      requestSearch(async, val, key = 'name') {
        return `${async}%7B"${key}":"${val}"%7D`
      },

      onHit(item) {
        const exist = _.find(this.bags, ['_id', item._id])

        if (!exist) {
          const app = _.pick(item, ['_id', 'name', 'family', 'environment'])
          this.$emit('add', app, this.step)
          this.commitItem(app)
        }
      },

      addRow(data) {
        let obj = _.get(data, 'deps', [])
        obj['parent_id'] = _.get(data, '_id')

        this.$parent.addRow(obj, this.step)
        this.$parent.activedApp(data)
      },

      commitItem(app) {

        if(this.parent_id) {
          const uri = `/${this.parent_id}/deps`;

          FectherEntity(Applications)({path: uri})
            .create(() => {
              CacheManager({k: `applications_${this.parent_id}`}).remove()
            }, app);
        }
      }
    },

    created() {
      this.$set(this, 'bags', this.apps)
    }
  }
</script>
