import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Purchase from './views/Purchase.vue'
import CheckPurchase from './views/CheckPurchase.vue'
import Setting from './views/Setting.vue'
import EditSettings from './views/EditSettings.vue'
import Payment from './views/Payment.vue'
import PaymentList from './views/PaymentList.vue'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import Customer from './views/Customer.vue'
import Admin from './views/Admin.vue'
import Role from './views/Role.vue'
import Product from './views/Product.vue'
import CustomerCreate from './views/CustomerCreate.vue'

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
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/customer',
      name: 'customer',
      component: Customer
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/role',
      name: 'role',
      component: Role
    },
    {
      path: '/products',
      name: 'products',
      component: Product
    },
    {
      path: '/customercreate',
      name: 'customercreate',
      component: CustomerCreate
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
    {
      path: '/settings',
      name: 'settings',
      component: Setting
    },
    {
      path: '/editSettings',
      name: 'editSettings',
      component: EditSettings
    },
    {
      path: '/payment',
      name: 'payment',
      component: Payment
    },
    {
      path: '/paymentList',
      name: 'paymentlist',
      component: PaymentList
    },
  ]
})
