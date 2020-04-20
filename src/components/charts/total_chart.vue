<template>
  <div>
    <bs-list>
      <li class="list-group-item word-break text-center">
        <b>Total of {{ options.title.text }}: </b>
        <bs-label>{{ total }}</bs-label>
      </li>
    </bs-list>

    <div class="col-sm-12">
      <doughnut-chart
        :data="data"
        :options="transfOptions"
      />
    </div>
  </div>
</template>

<style>
  .rtitle {
    font-weight: bold;
    color: #666666;
  }
</style>


<script>
  import _ from 'lodash'
  import doughnutChart from 'components/charts/doughnut_chart.vue'

  export default {

    components: {
      doughnutChart
    },
    props: ['data', 'options'],

    computed: {
      total () {
        const siz = _.get(this.data, 'labels', [])
        return siz.length
      },

      transfOptions () {
        return {
          legend: {
            position: 'right'
          },
          maintainAspectRatio: false
        }
      }
    },

    title () {
      return _.get(this.options, 'title.text', '')
    }
  }
</script>
