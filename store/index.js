import Vuex from 'vuex'
import Vue from 'vue'
import Vapi from 'vuex-rest-api'
import Axios from 'axios'

Vue.use(Vuex)

const store = new Vapi({
  baseURL: 'https://waldorf.distrochooser.de/',
  state: {
    data: null,
    result: null,
    rating: null,
    tags: {}, 
    test: null, // the submitted test..
    userAgent: '',
    referrer: '',
    language: 'en',
    options: {
      displayExcluded: false
    },
    loaded: false
  }
})
  .post({
    property: 'data',
    action: 'getData',
    path: ({language}) => `get/${language}/`
  })
  .get({
    property: 'result',
    action: 'getResult',
    path: ({id}) => `getresult/${id}/`
  })
  .get({
    property: 'rating',
    action: 'setRating',
    path: ({test, rating}) => `addrating/${test}/${rating}`
  })
  .post({
    property: 'test',
    action: 'addResult',
    path: ({language, visitor}) => `addresult/${language}/1/${visitor}/`
  })
  .getStore({
    createStateFn: true
  })

  store.mutations.setTags = function (state, tags) {
    state.tags = tags
  }  
  store.mutations.setUserAgent = function (state, userAgent) {
    state.userAgent = userAgent
  }
  store.mutations.setReferrer = function (state, referrer) {
    state.referrer = referrer
  }
  store.mutations.setTest = function (state, test) {
    state.test = test
  }
  store.mutations.setLanguage = function (state, language) {
    state.language = language
  }
  store.mutations.alterQuestions = function (state, delegate) {
    state.data.questions.forEach(delegate)
  }
  store.mutations.setQuestions = function (state, questions) {
    state.data.questions = questions
  }
  store.mutations.setResult = function (state, result) {
    state.result = result
  }
  store.mutations.setDisplayExcluded = function (state, value) {
    state.options.displayExcluded = value
  }
  store.mutations.setLoaded = function (state, loaded) {
    state.loaded = loaded
  }

export default store
