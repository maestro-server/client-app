<template>
  <div>
    <div class="row">
      <div class="col-xs-12">
        <p class="col-xs-12">List all servers belongs to application, using the form below to search this servers.</p>
        <div class="col-xs-6">
          <typeahead
            label="Search by Hostname"
            placeholder="back0100"
            :async="URL"
            async-key="items"
            :onSearch="requestSearch"
            :template="template"
            :on-hit="onHit"
            class="col-xs-12"
          ></typeahead>
        </div>

        <div class="col-xs-6">
          <typeahead
            label="Search by Private IP"
            placeholder="10.150.0.0"
            :async="URL"
            async-key="items"
            :onSearch="requestIpSearch"
            :template="template"
            :on-hit="onHit"
            class="col-xs-12"
          ></typeahead>
        </div>
      </div>

    </div>

    <div class="well row mt20">

      <ul v-if="value.length > 0" class="list-group">
        <li class="list-group-item row" v-for="item, i in value" :key="i">
          <div class="col-xs-10">
          <b>{{item.hostname}}</b> <span v-if='item.os'>({{item.os.base}})</span><span v-if='item.dc'> - {{item.dc.name}}</span><br/>
          <h5 class='ft15'>
            <bs-label type='default'>{{item.ipv4_private}}</bs-label>
            <bs-label type='default'>{{item.ipv4_public}}</bs-label>
            <bs-label type='success'>{{item.role}}</bs-label>
            <bs-label type='success'>{{item.environment}}</bs-label>
          </h5>
          </div>

          <button class="btn btn-danger btn-xs pull-right" @click.prevent="deleteServer(index)"><i
            class="fa fa-trash" aria-hidden="true"></i></button>
        </li>
      </ul>
      <span v-if="value.length <= 0" class="col-xs-12 text-center">None server selected</span>
      <bs-label v-if="value.length > 0" type="default">{{value.length}} Server<span
        v-if="value.length > 1">s</span></bs-label>
    </div>
    <small class="pull-right">List all servers which that app use, db, cache and storage object is included</small>
  </div>
</template>

<style>
  .ft15 {
    font-size:15px;
  }
</style>


<script>
  'use strict'

  export default {

    data: function () {

      return {
        URL: `${API_URL}/servers?query=`,
        value: [],
        clearValue: [],
        template: "<b>{{item.hostname}}</b> <span v-if='item.os'>({{item.os.base}})</span> - <span v-if='item.dc'>{{item.dc.name}}</span><br/> " +
        "<h5 class='ft15'><bs-label type='default'>{{item.ipv4_private}}</bs-label> <bs-label type='default'>{{item.ipv4_public}}</bs-label> <bs-label type='success'>{{item.role}}</bs-label> <bs-label type='success'>{{item.environment}}</bs-label></h5>"
      }
    },

    methods: {
      requestIpSearch(async, val) {
        return this.requestSearch(async, val, 'ipv4_private')
      },

      requestSearch(async, val, key='hostname') {
        return `${async}%7B"${key}":"${val}"%7D`
      },

      onHit(item) {
        const exist = _.find(this.value, ['_id', item._id])

        if (!exist) {
          this.value.push(item)
          this.clearValue.push(_.get(item, '_id'))
          this.$emit('update', this.clearValue)
        }
      },

      deleteServer(key) {
        this.value.splice(key, 1)
        this.clearValue.splice(key, 1)
        this.$emit('update', this.clearValue)
      },

      updaterEdit(data) {
        this.$set(this, 'value', data || [])
      },

      reset() {
        this.value = this.clearValue = []
      }
    }
  }

</script>
