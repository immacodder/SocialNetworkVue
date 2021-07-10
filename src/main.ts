import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { router } from './router'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { store } from './store'

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: 'AIzaSyAmffOO8mDYpcr6ZkemMmnc44WFVf43YVI',
  authDomain: 'social-network-17737.firebaseapp.com',
  projectId: 'social-network-17737',
  storageBucket: 'social-network-17737.appspot.com',
  messagingSenderId: '707141568088',
  appId: '1:707141568088:web:ba014a830411e1f8cb6c2d'
})

// @ts-ignore
window.firebase = firebase

export { firebase }
Vue.use(VueRouter)

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
