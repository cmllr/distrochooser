import Vuex from 'vuex'
import Vue from 'vue'
// Step 1
import Vapi from 'vuex-rest-api'
import Axios from 'axios'

import nuxt from '../nuxt.config'
Vue.use(Vuex)

const store = new Vapi({
  baseURL: 'https://waldorf.distrochooser.de/',
  state: {
    data: null,
    result: null,
    rating: null,
    tags: {}, 
    test: null // the submitted test..
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

export default store
