<template>
    <div class="container">
      <loading></loading>
      <div class="columns" v-if="this.$store.state.loaded">
          <navigation></navigation>
          <questions></questions>
      </div>
    </div>
</template>

<script>
    import navigation from '../../components/navigation'
    import loading from '../../components/loading'
    import questions from '../../components/questions'
    import i18n from '../../mixins/i18n'
    export default {
      validate ({ params }) {
        var langOk = typeof params.lang === 'undefined' || /^.{2}$/.test(params.lang)
        var testOk = typeof params.test === 'undefined' || /^\d+$/.test(params.test)
        return testOk && langOk
      },
      data: function () {
        return {
          questions: [],
          'options': {
            displayFilters: false
          },
          introMessage: {
            'id': 'welcome',
            'text': '',
            'title': '',
            'isSingle': false,
            'answers': [
            ],
            excludedBy: null,
            'number': -1,
            'answered': false
          },
          loaded: false
        }
      },
      components: {
        navigation,
        questions,
        loading
      },
      mixins: [i18n],
      created: function () {
        this.init(this.$store.state.userAgent, this.$store.state.referrer)
      },
      head: function () {
        return {
          meta: [
            {
              hid: 'description',
              name: 'description',
              content: this.descriptions[this.$store.state.language]
            },
            {
              property: 'og:description',
              content: this.descriptions[this.$store.state.language]
            },
            {
              property: 'og:locale',
              content: this.$store.state.language
            },
            {
              name: 'twitter:description',
              content: this.descriptions[this.$store.state.language]
            }
          ]
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
              'language': this.$store.state.language
            }
          })
          for (var d in this.$store.state.data) {
              this[d] = this.$store.state.data[d]
          }
          var questions = this.$store.state.data.questions
          questions.forEach(function (element) {
              element.open = false
          }, this)
          console.log('Hello #' + this.$store.state.data.id)
          questions.splice(0, 0, this.introMessage)
          questions[0].text = this.text('sys.welcometext')
          questions[0].title = this.text('sys.welcometitle')
          this.$store.commit('setQuestions', questions)
          this.$store.commit('setLoaded', true)
          if (this.$store.state.test !== -1) {
              await this.$store.dispatch('getResult',{
                params:{
                  'id': this.$store.state.test
                }
              })
              var _t = this
              this.$store.commit('alterQuestions', function (element) {
                var selected = false
                element.answers.forEach(function (answer) {
                  // preselect the questions
                  if (_t.$store.state.result.answers.indexOf(answer.id) !== -1) {
                      answer.selected = true
                      selected = true
                  }
                }, this)
                element.answered = selected
            })
          }
        }   
      }
    }
</script>

<style>
  .container{
    padding-top: 1em;
  }
  body{
    font-size: .65rem !important;
  }
  p{
    margin-bottom: 0.5em;
  }
  .btn{
    font-size: .6rem !important;
  }
</style>
