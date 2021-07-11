import Vuex from 'vuex'
import { firebase } from './main'
import Vue from 'vue'
import {user} from './types'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null as user,
    password: '',
    email: '',
  },
  getters: {
    uid: (state) => state.user && state.user.uid,
  },
  mutations: {
    setUser: (state, user) => (state.user = user),
    setPassword: (state, password: string) => (state.password = password),
    setEmail: (state, email) => (state.email = email),
  },
})
