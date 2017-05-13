import Teams from 'factories/teams'

export default {
  data () {
    return {
      step: 1,
      createModal: false,
      model: {},
      newMember: {},
      members: {}
    }
  },

  computed: {
    previousValid () {
      return this.step > 1
    },
    forwardValid () {
      return this.step < 2
    },
    finalValid () {
      return this.step == 2
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
      new Teams()
        .authorization()
        .create(this.model, () => this.successAddTeams())
    },

    closed () {
      this.step = 1;
      this.createModal = false;
      this.valid = false;
    },

    addMember () {

    },

    deleteUser () {},

    successAddTeams () {
      this.createModal = false
      this.$parent.$refs.content.fetchData()
    }

  }

}
