<template>
  <div class="col-sm-3 col-xs-12">
    <doughnut-chart
      v-if="hasThis"
      :data="getMost"
      :options="options"
    />
    <well v-if="!hasThis">
      {{ pfail }}
    </well>
  </div>
</template>

<script>
'use strict'

import charts from 'mixins/charts'
import doughnutChart from 'components/charts/doughnut_chart.vue'

export default {

  components: {
    doughnutChart
  },
  mixins: [charts],

  props: {
    results: { default: () => [] },
    fielder: {},
    ptitle: {},
    pfail: { default: 'Empty data' }
  },

  data () {
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
    getMost () {
      if (this.results.length <= 0) {
        return []
      }

      const calculate = _(this.results)
        .filter(e => _.isArray(e[this.fielder]))
        .map(e => _.get(e, this.fielder))
        .transform((r, e) => r.push(...e), [])
        .transform(this.splitCount, {
          labels: [],
          info: []
        })
        .value()

      return this.factoryData(
        _.get(calculate, 'labels'),
        _.get(calculate, 'info')
      )
    },
    hasThis () {
      return _.has(this.getMost, 'datasets[0].data') && !_.isEmpty(this.getMost.datasets[0].data)
    }
  },

  methods: {
    splitCount (result, value) {
      const index = _.indexOf(result.labels, value.name)
      if (index === -1) {
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
