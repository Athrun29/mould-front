import Vue from 'vue'
import Router from 'vue-router'
import generalCutter from '@/views/generalCutter'
import glassCutter from '@/views/glassCutter'
import ncJob from '@/views/ncJob'
import record from '@/views/record'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/generalCutter',
      name: 'generalCutter',
      component: generalCutter
    },
    {
      path: '/glassCutter',
      name: 'glassCutter',
      component: glassCutter
    },
    {
      path: '/',
      name: 'glassCutter',
      component: glassCutter
    },
    {
      path: '/ncJob',
      name: 'ncJob',
      component: ncJob
    },
    {
      path: '/record',
      name: 'record',
      component: record
    }
  ]
})
