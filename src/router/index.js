import Vue from 'vue'
import Router from 'vue-router'

/** 页面 */
import login from '../pages/login'
import register from '../pages/register'
import index from '../pages/index'
import customized from '../pages/customized'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {
          path: '/',
          name: 'customized',
          component: customized
        }
      ]
    }
  ]
})
