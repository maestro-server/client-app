<template>
  <div class="col-sm-3 col-xs-6">
    <doughnut-chart :data="getMostFamilies" :options="options"></doughnut-chart>
  </div>
</template>

<script>
  'use strict'

  import charts from 'mixins/charts'
  import doughnutChart from '../components/doughnut_chart.vue'

  export default {
    mixins: [charts],

    props: {
      results: {default: () => []}
    },

    components: {
      doughnutChart
    },

    computed: {
      getMostFamilies() {
        if(this.results.length > 0) {

          const calculate = _(this.results)
            .filter(e=>_.has(e, 'provider'))
            .map(e=>e.provider)
            .transform(this.splitCount, {labels: [], info: []})
            .value()


          return this.factoryData(
            _.get(calculate, 'labels', 2),
            _.get(calculate, 'info', 2),
            5
          )
        }
      }
    },

    data() {
      return {
        options: {
          title: {
            display: true,
            text: 'Most providers used (last 20 dcs)'
          }
        }
      }
    },

    methods: {
      splitCount(result, value) {
        const index = _.indexOf(result.labels, value)

        if(index === -1) {
          result.labels.push(value)
          result.info.push(1)
        } else {
          result.info[index] = result.info[index] + 1
        }
        return result
      }
    }
  }
</script>
