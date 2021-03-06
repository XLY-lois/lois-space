import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    visitorInfo:{
      name:'',
      visitedTime:'',
      email:'',
      ip:''
    }
  },
  mutations: {
    SET_VISITOR_INFO(state,newInfo){
      state.visitorInfo = newInfo
    }
  },
  actions: {
  },
  modules: {
  }
})
