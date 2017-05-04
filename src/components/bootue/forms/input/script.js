import '../Forms.vue'

export default {
    props: {
    clearButton: {type: Boolean, default: false},
    cols: {type: Number, default: null},
    datalist: {type: Array, default: null},
    disabled: {type: Boolean, default: false},
    help: {type: String, default: null},
    error: {type: String, default: null},
    icon: {type: Boolean, default: false},
    label: {type: String, default: null},
    name: {type: String, default: null},
    placeholder: {type: String, default: null},
    readonly: {type: Boolean, default: false},
    rows: {type: Number, default: 3},
    type: {type: String, default: 'text'},
    value: {default: null},
    inline: {type: Boolean, default: false},
    horizontal: {type: Boolean, default: false},
    horizontalWrapper: {type: String, default: 'col-sm-10'},
    horizontalLabelWrapper: {type: String, default: 'col-sm-2'}
  },
  data () {
    return {
      options: this.datalist,
      val: this.value,
      isGroup: false,
      state: null,
      constants: {
        SUCCESS: 'success',
        WARNING: 'warning',
        ERROR: 'error'
      }
    }
  },
  computed: {
    id_datalist () {
      if (this.type !== 'textarea' && this.datalist instanceof Array) {
        if (!this._id_datalist) {
          if (!this.$root.id_datalist) {
            this.$root.id_datalist = 0
          }
          this._id_datalist = 'input-datalist' + this.$root.id_datalist++
        }
        return this._id_datalist
      }
      return null
    },
    input () {
      return this.$refs.input
    },
    showError () {
      return this.error
    },
    showHelp () {
      return this.help && (!this.showError)
    },
    showIcon () {
      let icc
      switch (this.state) {
        case this.constants.SUCCESS:
          icc = 'check'
          break
        case this.constants.ERROR:
          icc = 'times'
          break
        case this.constants.WARNING:
          icc = 'exclamation'
          break
      }
      return icc
    },
    title () {
      return this.error || this.help || ''
    },
    showState () {
      return this.state ? `has-${this.state}` : ''
    },
    labelFeedback () {
      return this.$slots['label'] || this.label
    }
  },
  watch: {
    error (val) {
      this.state=val ? this.constants.ERROR : this.constants.SUCCESS
    },
    datalist (val, old) {
      if (val !== old && val instanceof Array) {
        this.options = val
      }
    },
    options (val, old) {
      if (val !== old) this.$emit('options', val)
    },
    val (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    attr (value) {
      return ~['', null, undefined].indexOf(value) || value instanceof Function ? null : value
    },
    emit (e) {
      this.$emit(e.type, e.type === 'input' ? e.target.value : e)
    },
    focus () {
      this.input.focus()
    },
    reset () {
      this.val = ''
    },
    classWrapper () {
      if (this.isGroup && !this.inline) {
        return 'input-group'
      }

      if (this.horizontal) {
        return this.horizontalWrapper
      }

      return 'relative'
    },
    horizontalLabelClass () {
      if (this.horizontal) {
        return this.horizontalLabelWrapper
      }
    }
  },
  created () {
    this._input = true
  },
  mounted () {
    this.isGroup = typeof this.$slots.before === 'object' || typeof this.$slots.after === 'object'
  },
  beforeDestroy () {
    if (this._parent) {
      let index = this._parent.children.indexOf(this)
      this._parent.children.splice(index, 1)
    }
  }
}
