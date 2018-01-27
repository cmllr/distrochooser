import Vuex from 'vuex'
import Vue from 'vue'
// Step 1
import Vapi from 'vuex-rest-api'
import Axios from 'axios'

import nuxt from '../nuxt.config'
Vue.use(Vuex)

const store = new Vapi({
  baseURL: nuxt.globals.backend,
  state: {
    data: null,
    result: null
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
  .getStore({
    createStateFn: true
  })

export default store
