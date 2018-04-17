<template>

  <creater-list :single.sync="single" :basket="value" :label="label" @update="updaterEdit">

    <template slot="forms">
      <slot name="label">
        <p>Can create a chain task, this task will be executed after run a main task.</p>
      </slot>

      <typeahead label="Scheduler" placeholder="Job name"
                  :async="URL"
                  async-key="items"
                  :onSearch="requestSearch"
                  :template="template"
                  form-type="horizontal"
                  :on-hit="onHit"
                  class="mt20"
                  :headers="headers"
      ></typeahead>

      <bs-input type="number" min="1" class="mt20" form-type="horizontal" name="countdown" label="Countdown"
        v-model="single.countdown" placeholder="5" help="Waiting time in seconds before start."></bs-input>

      <bs-input type="number" min="1" class="mt20" form-type="horizontal" name="order"
        label="Order" v-model="single.order" placeholder="http://myrul:8080/webhook" help="The lower number have more priority"></bs-input>
    </template>

    <hr>

    <template slot="view" slot-scope="props">
      <b class="text-capitalize">{{props.item.name}}</b>
    </template>

  </creater-list>

</template>

<script>
  'use strict'

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
        countdown: 0,
        order: 1,
        URL:  `${new Scheduler().getUrl()}?query=`,
        template: "<h5><b>{{item.name}}</b></h5>",
        headers: headerLogin,
        single: {
          name: null,
          countdown: 0,
          order: 1,
          id: null
        }
      }
    },

    methods: {
      requestSearch(async, val, key = 'name') {
        return `${async}%7B"${key}":"${val}"%7D`
      },

      onHit(item) {return item},

      updaterEdit(data) {
        this.$set(this, 'value', data || [])
        const m = data.map(e=>e._id)
        this.$emit('update', m)
      }
    }
  }

</script>
