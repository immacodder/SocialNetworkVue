import Vuex from 'vuex'
import { firebase } from './main'
import Vue from 'vue'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null as null | firebase.User
  },
  getters: {
    uid: state => state.user && state.user.uid
  },
  mutations: {
    setUser: (state, user) => (state.user = user)
  }
})
