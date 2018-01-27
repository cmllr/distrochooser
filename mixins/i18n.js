export default {
  methods: {
    text: function (value) {
      return this.$store.state.data.i18n !== null && typeof this.$store.state.data.i18n[value] !== 'undefined' ? this.$store.state.data.i18n[value].translation : value
    },
    translateExcludedTags: function (answer) {
      var result = this.text('excludes') + ': <br>'
      var _t = this
      answer.excludeTags.forEach(function (t) {
        var text = _t.text(t)
        if (text !== '') {
          result += _t.text(t) + '<br>'
        }
      })
      return result.trim()
    }
  }
}
