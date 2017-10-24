'use strict'
import _ from 'lodash'

import Providers from 'factories/providers'
import ViewSingle from 'mixins/view-single'

export default {
  mixins: [ViewSingle],

  data: function () {
    return {
      entity: Providers,
      model: {},
      permissions: [
        {
          key: 'servers',
          name: 'Server discovery',
          required: ['describe-instances',
            'elb describe-load-balancers',
            'elbv2 describe-load-balancers',
            'elbv2 describe-target-groups',
            'elbv2 describe-target-health',
            'describe-auto-scaling-groups']
        },
        {
          key: 'rds',
          name: 'RDS discovery',
          required: [
            'describe-db-instances']
        },
        {
          key: 's3',
          name: 'Storage Object discovery',
          required: [
            's3api list-buckets',
            'list_distributions (CloudFront)']
        }
      ]
    }
  },

  computed: {
    MMembers() {
      return this.$parent.$refs.modal_members
    },
    filtered() {
      return _.omit(this.model, ['owner', 'roles', 'active', '_links', 'conn'])
    }
  },

  methods: {
  }
}
