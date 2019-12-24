import Vue from 'vue'
import Vuex from 'vuex'
import layerMainNav from './layerMainNav'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    layerMainNav
  }
})
