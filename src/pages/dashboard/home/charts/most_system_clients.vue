<template>
  <div class="col-sm-3 col-xs-6">
    <pie-chart :data="getMostServices" :options="options"></pie-chart>
  </div>
</template>

<script>
  'use strict'

  import charts from 'mixins/charts'
  import pieChart from '../components/pie_chart.vue'

  export default {
    mixins: [charts],

    props: {
      results: {default: () => []}
    },

    components: {
      pieChart
    },

    computed: {
      getMostServices() {
        if(this.results.length > 0) {

          const calculate = _(this.results)
            .filter(e=>_.isArray(e.clients))
            .map(e=>e.clients)
            .transform(_.merge, [])
            .transform(this.splitCount, {labels: [], info: []})
            .value()

          return this.factoryData(
            _.get(calculate, 'labels'),
            _.get(calculate, 'info')
          )
        }
      }
    },

    data() {
      return {
        options: {title: {display: true, text: 'Most clients used (last 20 system)'}}
      }
    },

    methods: {
      splitCount(result, value) {
        const index = _.indexOf(result.labels, value.name)

        if(index === -1) {
          result.labels.push(value.name)
          result.info.push(1)
        } else {
          result.info[index]++
        }

        return result
      }
    }
  }
</script>
