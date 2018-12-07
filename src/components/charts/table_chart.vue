<template>

  <div>
    <h6 class="rtitle text-center">{{options.title.text}}</h6>

    <bs-list>
      <li class="list-group-item word-break col-xs-6" v-for="item in lst" :key>
        {{item.label}}: <bs-label type='primary'>{{item.value}}</bs-label>
      </li>
    </bs-list>
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

  export default {
    props: ['data', 'options'],

    computed: {
      lst() {
        const {labels, datasets} = this.data
        let tmparr = []

        console.log(datasets[0])

        _.forEach(labels, (v, k) => {
          tmparr.push({
            'label': v,
            'value': datasets[0].data[k]
          })
        })
        return tmparr
      }
    },

    title() {
      return _.get(this.options, 'title.text', "")
    }
  }
</script>