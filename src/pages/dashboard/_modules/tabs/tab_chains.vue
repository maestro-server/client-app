<template>

  <creater-list :single.sync="single" :basket="value" :label="label" @update="updaterEdit">

    <template slot="forms">
      <slot name="label">
        <p>Can create a chain task, this task will be executed after run a main task. Order isn't guaranteed.</p>
      </slot>

      <typeahead label="Scheduler" placeholder="Scheduler name (Must be valid scheduler)"
                  :async="URL"
                  async-key="items"
                  :onSearch="requestSearch"
                  :template="template"
                  form-type="horizontal"
                  :on-hit="onHit"
                  class="mt20"
                  :headers="headers"
                  v-model="single.name"
                  @input="updateSingle"
      ></typeahead>

      <div class="row">
        <div class="col-xs-9 col-xs-offset-3">
          <span class="btn btn-success btn-xs" v-if="this.single._id"><i class="fa fa-check-circle-o"></i> Valid ({{single.name}})</span>
          <span class="btn btn-danger btn-xs" v-if="!this.single._id"><i class="fa fa-times-circle-o"></i> Select a valid Scheduler</span>
        </div>
      </div>

      <bs-input type="number" min="1" class="mt20" form-type="horizontal" name="countdown" label="Countdown"
        v-model="single.countdown" placeholder="5" help="Waiting time in seconds before start."></bs-input>
    </template>

    <hr>

    <template slot="view" slot-scope="props">
      <b class="text-capitalize">{{props.item.name}}</b>
      <span v-if="props.item.countdown"><br/>Countdown: {{props.item.countdown}}</span>
    </template>

  </creater-list>

</template>

<script>
  'use strict'

  import _ from 'lodash'
  import TabCreaterList from 'mixins/tab-creater-list'
  import Modals from 'mixins/modals'
  import Scheduler from 'factories/scheduler'
  import headerLogin from 'src/resources/libs/headerAuthorization'

  export default {
    mixins: [Modals, TabCreaterList],

    props: {
      label: {default: 'Chain Task'}
    },

    data: function () {
      return {
        URL:  `${new Scheduler().getUrl()}?query=`,
        template: "<h5><span class='btn btn-success btn-xs' v-if='item.enabled'><i class='fa fa-check-circle-o'></i></span><span class='btn btn-danger btn-xs' v-if='!item.enabled'><i class='fa fa-times-circle-o'></i></span> <b>{{item.name}}</b> - <bs-label type='default'>{{item.module}}</bs-label></h5>",
        headers: headerLogin,
        single: {
          _id: null,
          name: null,
          countdown: 0
        }
      }
    },

    methods: {
      requestSearch(async, val, key = 'name') {
        return `${async}%7B"${key}":"${val}"%7D`
      },

      onHit(item) {
        this.$set(this.single, '_id', _.get(item, '_id'))
        this.$set(this.single, 'name', _.get(item, 'name'))
        return item.name
      },

      updateSingle(data) {
        if(_.isString(data) && data.length == 0 ) {
          this.$set(this.single, '_id', null)
        }
      },

      updaterEdit(data) {
        const list = data || []
        const m = list.filter(e=>e._id)

        if(m) {
          this.$set(this, 'value', m)
          this.$emit('update', m)
        }
      }
    }
  }

</script>
