<template>
  <div class="col-sm-3 col-xs-6">
    <doughnut-chart :data="getMostServices" :options="options"></doughnut-chart>
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
      getMostServices() {
        if(this.results.length > 0) {

          const calculate = _(this.results)
            .filter(e=>_.isArray(e.services))
            .map(e=>e.services)
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
        options: {title: {display: true, text: 'Most services used (last 20 server)'}}
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
