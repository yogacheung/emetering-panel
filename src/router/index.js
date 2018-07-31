import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import Graph from '@/components/Graph'
import Report from '@/components/Report'
import Setting from '@/components/Setting'

Vue.use(Router)

export default new Router({
  routes: [    
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/graph/:unit?',
      name: 'Graph',
      component: Graph
    },
    {
      path: '/report',
      name: 'Report',
      component: Report
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    }        
  ]
})
