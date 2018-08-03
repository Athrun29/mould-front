import Vue from 'vue'
import Router from 'vue-router'
import generalCutter from '@/routers/generalCutter'
import glassCutter from '@/routers/glassCutter'
import ncJob from '@/routers/ncJob'
import record from '@/routers/record'

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
