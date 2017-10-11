<template>
  <div class="col-sm-3 col-xs-6">
    <pie-chart :data="getMostFamilies" :options="options"></pie-chart>
  </div>
</template>

<script>
  'use strict'

  import charts from 'mixins/charts'
  import pieChart from '../components/pie_chart.vue'

  export default {
    mixins: [charts],

    props: {
      results: {default: () => []},
      fielder: {},
      ptitle: {}
    },

    components: {
      pieChart
    },

    computed: {
      getMostFamilies() {
        if(this.results.length > 0) {

          const calculate = _(this.results)
            .filter(e=>_.has(e, this.fielder))
            .map(e=>_.get(e, this.fielder))
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
            text: this.ptitle
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
