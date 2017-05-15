
import _ from 'lodash'
// define a mixin object
export default {
  data () {
    return {
      text: {},
      step: 1,
      showModal: false,
      model: {},
      stepControl: {},
      create: true
    }
  },

  computed: {
    previousValid () {
      return this.step > this.stepControl.previous
    },
    forwardValid () {
      return this.step < this.stepControl.forwad
    },
    finalValid () {
      return this.step == this.stepControl.final
    }
  },

  methods: {
    afterShow () {},
    createSave () {},
    editSave () {},
    callback () {},
    show (model={}, step=1, showModal=true) {
      this.step = step
      this.showModal = showModal
      this.model = _.clone(model)
      this.create = _.empty(model)

      if(this.create) {
        this.setupSteps()
      }

      this.afterShow()
    },

    actionClick () {
      if(this.create) {
        this.createSave()
      } else {
        this.editSave()
      }
    },

    setupSteps (previous=1, forwad=2, final=2) {
      this.stepControl = {previous, forwad, final}
      return this
    },

    nextMethod () {
      if (this.forwardValid) {
        this.step = this.step + 1;
      }
    },

    previousMethod () {
      if (this.previousValid) {
        this.step = this.step - 1;
      }
    },

    closed () {
      this.step = 1
      this.errors.clear('modals');
      this.showModal = false
      this.model = {}
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
