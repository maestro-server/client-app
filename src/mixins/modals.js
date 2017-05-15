e
// define a mixin object
export default {
  data () {
    return {
      text: {},
      step: 1,
      showModal: false,
      model: {},
      stepControl: {},
      edit: false,
      callback: () => {}
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
    show (model={}, step=1, showModal=true) {
      this.step = step
      this.showModal = showModal
      this.model = model
      this.edit = Object.keys(model).length === 1

      if(this.edit) {
        this.setupSteps()
      }

      this.afterShow()
    },

    actionClick () {
      if(this.edit) {
        this.createSave()
      } else {
        this.editSave()
      }
    },

    createSave () {

    },

    editSave () {
      new Teams()
        .authorization()
        .update(this.model._id, this.model, this.callback(this.model))
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

    onClickCallBack (func) {
      this.callback = func
      return this
    },

    closed () {
      this.step = 1
      this.createModal = false
      this.model = {}
    }

  }
}
