'use strict'
import _ from 'lodash'

export default {
  data () {
    return {
      text: {title:null},
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
    show (model={}, step=1, showModal=true) {
      this.showModal = showModal
      this.model = _.clone(model)
      this.create = !_.has(model, '_id')
      this.afterShow()
    },

    actionClick () {
      if(this.create) {
        this.createSave()
      } else {
        this.editSave()
      }
    },

    closed () {
      this.step=1
      this.model = {}
      this.showModal = false

      this.afterClose()
    },

    reset () {
      this.errors.clear()
    },

    onFinishCallBack (func) {
      this.callback = func
      return this
    },

    finishJob () {
      this.callback(this.model)
      this.closed()
    }

  }
}
