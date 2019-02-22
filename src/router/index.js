import Vue from 'vue'
import Router from 'vue-router'

/** 页面 */
import login from '../pages/common/login'
import register from '../pages/common/register'
import home from '../pages/common/home'

import customized from '../pages/tenant/customized'
import plan from '../pages/tenant/plan'
import platformPrice from '../pages/tenant/platformPrice'
import account from '../pages/tenant/account'


Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'current',
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
      name: 'home',
      component: home,
      children: [
        {
          path: '/home',
          name: 'customized',
          component: customized
        },
        {
          path: '/plan',
          name: 'plan',
          component: plan
        },
        {
          path: '/platformPrice',
          name: 'platformPrice',
          component: platformPrice
        },
        {
          path: '/account',
          name: 'account',
          component: account
        }
      ]
    }
  ]
})
