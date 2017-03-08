export default {
  data () {
    return {
      step: 1,
      createModal: false,
      valid: false
    }
  },

  computed: {
    previousValid () {
      return this.step > 1
    },
    forwardValid () {
      return this.step < 3
    },
    finalValid () {
      return this.step == 3
    }
  },

  methods: {
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

    saveMethod () {

    },

    closed () {
      this.step = 1;
      this.createModal = false;
      this.valid = false;
    }

  }

}
