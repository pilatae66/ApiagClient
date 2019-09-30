import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Purchase from './views/Purchase.vue'
import CheckPurchase from './views/CheckPurchase.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./views/Dashboard.vue')
    },
    {
      path: '/customer',
      name: 'customer',
      component: () => import('./views/Customer.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('./views/Admin.vue')
    },
    {
      path: '/role',
      name: 'role',
      component: () => import('./views/Role.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('./views/Product.vue')
    },
    {
      path: '/customercreate',
      name: 'customercreate',
      component: () => import('./views/CustomerCreate.vue')
    },
    {
      path: '/checkpurchase/:id',
      name: 'checkpurchase',
      component: CheckPurchase
    },
    {
      path: '/purchase/:id',
      name: 'purchase',
      component: Purchase
    },
  ]
})
