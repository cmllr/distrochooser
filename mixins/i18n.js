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
  },
  data: function () {
    return {
      locales: [
        'de',
        'en'
      ],
      welcomeHeader: {
        'de': 'Willkommen beim Distrochooser',
        'en': 'Welcome to Distrochooser!'
      }, 
      descriptions:{
        'de': 'Die Linux Auswahlhilfe hilft Anfängern und Umsteigern in der Menge von Linux-Distributionen die passende Linux-Distribution zu finden.',
        'en': 'The Distrochooser helps you to find the suitable Linux distribution based on your needs!'
      },
      longDescriptions:  {
        'de': 'Die Linux Auswahlhilfe hilft Anfängern und Umsteigern in der Menge von Linux-Distributionen die passende Linux-Distribution zu finden.' + '<br> <br>Dabei musst Du lediglich einfache Fragen über Deine Anforderungen und Wünsche in unserer Linux-Auswahlhilfe beantworten. Anschließend ermitteln wir für Dich, welches Linux für Deine Anforderungen geeignet sein könnte.',
        'en': 'The Distrochooser helps you to find the suitable Linux distribution based on your needs!' + '<br> <br>You only have to answer our questions about your requirements for a Linux distribution. After you finished, we will calculate a list of Linux distributions which will fit your needs.'
      }
    }
  }
}
