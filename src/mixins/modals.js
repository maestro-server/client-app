'use strict'
import _ from 'lodash'
import formatAdminer from 'src/resources/libs/formatAdminerData'

export default {
  data () {
    return {
      tabShow: 0,
      text: { title: null },
      showModal: false,
      model: {},
      create: true
    }
  },

  methods: {
    afterShow () {},
    afterClose () {},
    createSave () {},
    editSave () {},
    callback () {},
    createLoad () {},
    editLoad () {},
    show (model = {}, showModal = true) {
      this.showModal = showModal
      this.model = _.clone(model)
      this.create = !_.has(model, '_id')

      this.afterShow() // hook to call after show modal
      this.create ? this.createLoad() : this.editLoad()
    },

    setTabShow (index) {
      this.tabShow = index
      return this
    },

    actionClick () {
      if (this.create) {
        this.createSave()
      } else {
        this.editSave()
      }
    },

    closed () {
      this.model = {}
      this.showModal = false

      this.afterClose()
    },

    reset () {
      this.errors.clear()
    },

    resetData () {
      this.$set(this, 'data', _.assign({}, this.initialApp))
    },

    onFinishCallBack (func) {
      this.callback = func
      return this
    },

    finishJob () {
      this.callback(this.model)
      this.closed()
    },

    fetchAdminer (e) {
      _.assign(this.options, formatAdminer(e))
    }

  }
}
