<template>
  <creater-list
:basket="value"
label="Client"
:show-add-btn="false"
@update="updaterEdit"
>
<template slot="forms">
      <div class="text-right">
        <router-link
:to="{name: 'clients'}"
class="btn btn-primary btn-xs"
target="_blank"
>
          <i class="fa fa-plus-circle" /> Clients
        </router-link>
      </div>

      <typeahead
label="Clients"
placeholder="Name of Client"
                 :async="URL"
                 async-key="items"
                 :on-search="requestSearch"
                 :template="template"
                 form-type="horizontal"
                 :on-hit="onHit"
                 class="mt10"
                 :headers="headers"
      />
    </template>

    <template
slot="view"
slot-scope="props"
>
      <b class="text-capitalize">{{ props.item.name }}</b>
    </template>
</creater-list>
</template>

<script>
  'use strict'

  import TabCreaterList from 'mixins/tab-creater-list'
  import Clients from 'factories/clients'
  import headerLogin from 'src/resources/libs/headerAuthorization'

  export default {
    mixins: [TabCreaterList],

    data: function () {
      return {
        headers: headerLogin,
        URL: `${new Clients().getUrl()}?query=`,
        template: "<b>{{item.name}}</b>",
        filter: ['_id', 'name']
      }
    },

    methods: {
      requestSearch(async, val, key='name') {
        return `${async}%7B"${key}":"${val}"%7D`
      }
    }
  }

</script>
