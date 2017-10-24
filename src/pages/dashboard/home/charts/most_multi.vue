<template>
  <div class="col-sm-3 col-xs-6">
    <doughnut-chart :data="getMost" :options="options"></doughnut-chart>
  </div>
</template>

<script>
  'use strict'

  import charts from 'mixins/charts'
  import doughnutChart from '../components/doughnut_chart.vue'

  export default {
    mixins: [charts],

    props: {
      results: {default: () => []},
      fielder: {},
      ptitle: {}
    },

    components: {
      doughnutChart
    },

    computed: {
      getMost() {
        if(this.results.length > 0) {
          console.log("==========================", this.fielder)

          const calculate = _(this.results)
            .filter(e=>_.isArray(e[this.fielder]))
            .map(e=>_.get(e, this.fielder))
            .transform((r, e)=>r.push(...e), [])
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
        options: {title: {display: true, text: this.ptitle}}
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
