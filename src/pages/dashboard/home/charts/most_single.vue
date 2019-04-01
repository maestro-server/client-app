<template>
  <div class="col-sm-3 col-xs-12">
    <pie-chart
:data="getMostFamilies"
:options="options"
/>
  </div>
</template>

<script>
  'use strict'

  import charts from 'mixins/charts'
  import pieChart from 'components/charts/pie_chart.vue'

  export default {

    components: {
      pieChart
    },
    mixins: [charts],

    props: {
      results: {default: () => []},
      fielder: {},
      ptitle: {}
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

    computed: {
      getMostFamilies() {
        if(this.results.length <= 0)
          return []

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
