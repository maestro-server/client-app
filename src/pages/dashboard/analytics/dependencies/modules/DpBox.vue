<template>
  <div class="dp-item" @click="add">
    <h5>{{name}}</h5>
    <p v-if="family"><span class="dst">{{family}}</span></p>
    <p v-if="environment"><span class="dst">{{environment}}</span></p>

    <a class="more more-del">X</a>
  </div>
</template>

<script>
  'use strict'
  import _ from 'lodash'
  import FectherEntity from 'services/fetchEntity'
  import Applications from 'factories/applications'

  export default {
    props: {
      id: {type: String},
      name: {type: String},
      family: {type: String},
      environment: {type: String}
    },

    methods: {
      add() {
        FectherEntity(Applications)()
          .findOne((e) => {
            const data = _.get(e, 'data', []);
            this.$parent.addRow(data)
          }, this.id)
      }
    }
  }
</script>
