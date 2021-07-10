import VueRouter, { RouteConfig } from 'vue-router'
import TEST from './views/testy.vue'
import Home from './views/Home.vue'
import Sign from './views/Sign.vue'
import Complete from './views/Complete.vue'

const routes: RouteConfig[] = [
  { path: '/', component: Home },
  { path: '/test', component: TEST },
  { path: '/signup', component: Sign, props: { isLogin: false } },
  { path: '/complete', component: Complete },
  { path: '/login', component: Sign, props: { isLogin: true } }
]

export const router = new VueRouter({ routes, mode: 'history' })
