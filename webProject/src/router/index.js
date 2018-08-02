import Vue from 'vue'
import Router from 'vue-router'
import hello from '@/routers/hello'
import home from '@/routers/home'
import special from '@/routers/special'
import general from '@/routers/general'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'hello',
      component: hello
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/special',
      name: 'special',
      component: special
    },
    {
      path: '/general',
      name: 'general',
      component: general
    }
  ]
})
