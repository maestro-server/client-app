'use strict'

import Modals from 'mixins/modals'
import Volumes from 'factories/volumes'
import Adminer from 'factories/adminer'
import FectherEntity from 'services/fetchEntity'
import verifyDuplicate from 'mixins/verify_duplicate'

import tabTags from 'src/pages/dashboard/_modules/tabs/tab_tags'
import tabAppDc from 'src/pages/dashboard/_modules/tabs/tab_app_datacenter'


export default {
  mixins: [Modals, verifyDuplicate],

  components: {
    tabTags,
    tabAppDc
  },

  computed: {
    tab_app_dc () {
      return this.$refs.tab_app_dc
    },
    tab_tags () {
      return this.$refs.tab_tags
    }
  },

  data () {
    const defaultVolume = {
      name: null,
      unique_id: "",
      iops: null,
      size: null,
      status: "Active",
      encrypted: false,
      volume_type: null,
      tags: [],
      datacenters: {}
    }

    return {
      entity: Volumes,
      initialData: _.clone(defaultVolume),
      data: _.clone(defaultVolume),
      options: {
        status: []
      }
    }
  },

  methods: {
    afterShow () {
      this.text.title = this.create ? 'Create new Volume' : `Edit ${this.model.name} volume`
    },

    createLoad () {
      this.tabShow = 0
      this.data = _.clone(this.initialData)
      this.tab_app_dc.reset()
      this.tab_tags.reset()
    },

    editLoad () {
      this.$set(this, 'data', this.model)
      this.tab_app_dc.updaterEdit(_.get(this.model, 'datacenters', {}))
      this.tab_tags.updaterEdit(_.get(this.model, 'tags', []))
    },


    setupModel () {
      this.model = _.pickBy(this.data, _.identity)
      this.defaultUniqueId()
    },

    defaultUniqueId () {
      if (_.isEmpty(this.data.unique_id)) {
        const { name, size } = _.pick(this.data, ['name', 'size'])
        const now = Date.now()
        const random = Math.random()
        const unique_id = `${name}${size}${random}${now}`
        this.$set(this.model, 'unique_id', unique_id)
      }
    },

    createSave () {
      this.setupModel()

      FectherEntity(Volumes)()
        .create(this.finishJob, this.model)
    },

    editSave () {
      this.setupModel()
      FectherEntity(Volumes)()
        .update(this.finishJob, this.model)
    },

    fetchData () {
      FectherEntity(Adminer)({ persistence: 'local' })
        .find(this.fetchAdminer, { key: 'status_volume_options' })
    }
  },

  created () {
    this.fetchData()
  }

}
