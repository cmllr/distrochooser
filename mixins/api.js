import axios from 'axios'
import nuxt from '../nuxt.config'

export default {
  created: function () {
    nuxt.globals.useragent = typeof navigator === 'undefined' ? '' : navigator.userAgent
    nuxt.globals.referrer = typeof document === 'undefined' ? '' : document.referrer
    if (this.$route.params.lang !== undefined) {
      var p = this.$route.params.lang
      if (nuxt.globals.locales.indexOf(p) !== -1) {
        nuxt.globals.lang = this.$route.params.lang
      } else {
        nuxt.globals.lang = 'en'
      }
    } else {
      nuxt.globals.lang = 'de'
    }
    if (typeof this.$route.query['l'] !== 'undefined') {
      var raw = parseInt(this.$route.query['l'])
      nuxt.globals.lang = raw === 1 ? 'de' : 'en'
    }
    if (this.$route.params.test !== undefined) {
      nuxt.globals.test = this.$route.params.test
    }
  },
  methods: {
    init: async function (userAgent, referrer) {        
      await this.$store.dispatch('getData',{
        data: {
          'useragent': userAgent,
           'referrer': referrer, 
           'prerender': process.server
          }, 
        params:{
          'language': nuxt.globals.lang 
        }
      })
      this.nuxt.globals.i18n = this.$store.state.data.i18n
      this.nuxt.globals.questions = this.$store.state.data.questions
      this.nuxt.globals.distrochooser.questions = nuxt.globals.questions
      this.nuxt.globals.distros = this.$store.state.data.distros
      for (var d in this.$store.state.data) {
          this[d] = this.$store.state.data[d]
      }
      nuxt.globals.questions.forEach(function (element) {
          element.open = false
      }, this)
      this.nuxt.globals.visitor = this.$store.state.data.id
      console.log('Hello #' + this.nuxt.globals.visitor)
      nuxt.globals.questions.splice(0, 0, this.introMessage)
      nuxt.globals.questions[0].text = this.text('sys.welcometext')
      nuxt.globals.questions[0].title = this.text('sys.welcometitle')
      nuxt.globals.distrochooser.loaded = true
      if (this.nuxt.globals.test !== -1) {
          await this.$store.dispatch('getResult',{
            params:{
              'id': nuxt.globals.test
            }
          })
          this.globals.preloadInfos = this.$store.state.result
          nuxt.globals.questions.forEach(function (element) {
              var selected = false
              element.answers.forEach(function (answer) {
                if (this.globals.preloadInfos.answers.indexOf(answer.id) !== -1) {
                    answer.selected = true
                    selected = true
                }
              }, this)
              element.answered = selected
          }, this)
      }
    },
    setRating: async function (rating, test) {
      await this.$store.dispatch('setRating', {
        params:{
          'test': test,
          'rating': rating
        }
      })
    },
    addResult: async function (instance) {
      var tags = this.nuxt.globals.mainInstance.tags // eslint-disable-line no-unused-vars
      var answers = [] // eslint-disable-line no-unused-vars
      for (var i in this.nuxt.globals.mainInstance.answered) {
        var answer = this.nuxt.globals.mainInstance.answered[i]
        answer.answers.forEach(function (answer) {
          if (answer.selected) {
            answers.push(answer.id)
          }
        })
      }
      var tagsToSubmit = []
      for (var tag in tags) {
        var element = {
          'name': tag,
          'weight': parseInt(tags[tag].weight),
          'negative': tags[tag].negative,
          'amount': tags[tag].amount
        }
        tagsToSubmit.push(element)
      }
      await this.$store.dispatch('addResult',{
        data: {
          'answers': answers,
          'tags': tagsToSubmit
        }, 
        params:{
          'language': nuxt.globals.lang,
          'visitor': this.$store.state.data.id
        }
      })
    }
  }
}
