import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import router from "./router";

Vue.use(Vuex)
let url = process.env.NODE_ENV !== 'production' ? 'http://localhost:8000' : 'https://transcycle-server.herokuapp.com'

export default new Vuex.Store({
  state: {
    appState:{
      loggedIn:false
    },
    due_customers: null,
    payments: null,
    adminItems:[
      { title: 'Admin', icon: 'perm_identity', to: 'admin' },
      { title: 'Products', icon: 'motorcycle', to: 'products' },
      { title: 'Purchases', icon: 'mdi-cash-100', to: 'purchaselist' },
      { title: 'Settings', icon: 'settings', to: 'settings' },
    ],
    agentItems:[
      { title: 'Customer', icon: 'mdi-face', to: 'customer' },
    ],
    cashierItems:[
      { title: 'Payments', icon: 'mdi-cash-100', to:'payment' },
      { title: 'Payments List', icon: 'mdi-cash-100', to:'paymentlist' },
    ],
    admins:{
      admins:[],
      errors:{
        firstname:'',
        middlename:'',
        lastname:'',
        username:'',
        password:'',
        role:''
      }
    },
    user:{
      users:{},
      auth_user:{},
      auth_token:""
    },
    products:{
      products:[],
      errors:{
        type:"",
        brand:"",
        model:"",
        color:"",
      }
    },
    roles:{
      roles:[],
      errors:{
        name:""
      }
    },
    customers:{
      customers:[],
      errors:{
        customer_name:{
        },
         customer_details: {
        },
        customer_address: {
        },
        customer_family: {
        },
        customer_employment_details: {
            self_employed: {
                business_name: '',
                nature_of_business: '',
                address: '',
                landline_number: '',
                mobile_number: ''
            },
            employed: {
                type_of_org: "",
                company_name: "",
                length_of_stay: "",
                address: "",
                landline_number: "",
                mobile_number: "",
                nature_of_business: "",
                position: "",
                employment_status: "",
            }
        },
        customer_financial_info:{
            income:[{
                source_of_income:'',
                who:'',
                amount:0
            }],
            liability:[{
                liability:'',
                amount:0
            }]
        }
      }
    },
    purchasedProducts:[],
    loading: false,
    drawer: false,
    purchased_product:{},
    settings:{},
    customer_purchase: null,
    customers_with_purchase: [
      {
        id:''
      }
    ]
  },
  mutations: {
    LOGIN(state, payload){
      state.user.auth_token = payload.token
      state.user.auth_user = payload.user
      setTimeout(() => {
          state.appState.loggedIn = true
      }, 500);
      state.drawer = true
      localStorage.setItem('auth_user', JSON.stringify(payload))
      switch (payload.user.role) {
        case 'Cashier':
          router.push('payment')
          break;

        case 'Admin':
          router.push('admin')
          break;
      

        case 'Agent':
          router.push('customer')
          break;
      
        default:
          break;
      }
      Vue.swal('Success!', 'Logged in Successfully!', 'success')
    },
    LOGINERROR(state, payload){
      Vue.swal(payload.title, payload.message, 'error')
    },
    LOGOUT(state){
      state.drawer = false
      setTimeout(() => {
          state.appState.loggedIn = false
      }, 500);
      localStorage.removeItem('auth_user')
      state.user.auth_token = ""
      state.user.auth_user = ""
      router.push('/')
      Vue.swal('Success!', 'Logged out Successfully!', 'success')
    },
    PRODUCTINIT(state, payload){
      state.products.products = payload.data
    },
    PRODUCTSTORE(state, payload){
      state.products.products.push(payload.data)
      state.products.errors.type = ""
      state.products.errors.brand = ""
      state.products.errors.model = ""
      state.products.errors.color = ""
      Vue.swal('Success!', 'Product Added Successfully!', 'success')
    },
    PRODUCTUPDATE(state, payload){
      Vue.set(state.products.products[payload.index], 'type', payload.product.type)
      Vue.set(state.products.products[payload.index], 'brand', payload.product.brand)
      Vue.set(state.products.products[payload.index], 'model', payload.product.model)
      Vue.set(state.products.products[payload.index], 'color', payload.product.color)
      Vue.set(state.products.products[payload.index], 'price', payload.product.price)
      Vue.set(state.products.products[payload.index], 'downpayment', payload.product.downpayment)
      Vue.set(state.products.products[payload.index], 'date_registered', payload.product.date_registered)
      Vue.swal('Success!', 'Product Updated Successfully!', 'success')
    },
    PRODUCTDESTROY(state, payload){
      state.products.products.splice(payload,1)
      Vue.swal('Success!', 'Product Deleted Successfully!', 'success')
    },
    ROLEINIT(state, payload){
      state.roles.roles = payload.data
    },
    ROLESTORE(state, payload){
      state.roles.roles.push(payload)
      state.roles.errors.name = ""
      Vue.swal('Success!', 'Role Added Successfully!', 'success')
    },
    ROLEUPDATE(state, payload){
      Vue.set(state.roles.roles[payload.index], 'name', payload.name)
      state.roles.errors.name = ""
      Vue.swal('Success!', 'Role Updated Successfully!', 'success')
    },
    ROLEDESTROY(state, payload){
      state.roles.roles.splice(payload,1)
      Vue.swal('Success!', 'Role Deleted Successfully!', 'success')
    },
    ADMININIT(state, payload){
      state.admins.admins = payload.data
    },
    USERSTORE(state, payload){
      state.admins.admins.push(payload)
      state.admins.errors.name = ""
      Vue.swal('Success!', 'User Added Successfully!', 'success')
    },
    USERUPDATE(state, payload){
      Vue.set(state.admins.admins[payload.index], 'firstname', payload.firstname)
      state.admins.errors.firstname = ""
      Vue.set(state.admins.admins[payload.index], 'middlename', payload.middlename)
      state.admins.errors.middlename = ""
      Vue.set(state.admins.admins[payload.index], 'lastname', payload.lastname)
      state.admins.errors.lastname = ""
      Vue.set(state.admins.admins[payload.index], 'username', payload.username)
      state.admins.errors.username = ""
      Vue.set(state.admins.admins[payload.index], 'role', payload.role)
      state.admins.errors.role = ""
      Vue.set(state.admins.admins[payload.index], 'role_id', payload.role_id)
      state.admins.errors.role_id = ""
      let full_name = `${payload.firstname} ${payload.middlename[0]} ${payload.lastname}`
      Vue.set(state.admins.admins[payload.index], 'full_name', full_name)
      Vue.swal('Success!', 'User Updated Successfully!', 'success')
    },
    USERDESTROY(state, payload){
      state.admins.admins.splice(payload,1)
      Vue.swal('Success!', 'User Deleted Successfully!', 'success')
    },
    CUSTOMERINIT(state, payload){
      state.customers.customers = payload.data
    },
    CUSTOMERSWITHPURCHASE(state, payload){
      state.customers_with_purchase = payload.data
    },
    CUSTOMERSTORE(state, payload){
      state.customers.customers.push(payload)
      state.customers.errors.name = ""
      Vue.swal('Success!', 'Customer Added Successfully!', 'success')
      router.push({name: 'customer'})
    },
    CUSTOMERUPDATE(state, payload){
      const customer = state.customers.customers.find(customer => customer.id == payload.data.id)
      Object.assign(customer, payload.data)
      router.push({ name: 'customer' })
      Vue.swal('Success!', 'Customer Updated Successfully!', 'success')
    },
    CUSTOMERDESTROY(state, payload){
      state.customers.customers.splice(payload,1)
      Vue.swal('Success!', 'Customer Deleted Successfully!', 'success')
    },
    PURCHASEINIT(state, payload){
      state.purchasedProducts = payload.data
    },
    PURCHASESTORE(state){
      Vue.swal('Success!', 'Product Purchased Successfully!', 'success')
      router.push({name: 'customer'})
      state.loading = false
    },
    PURCHASEUPDATE(state, payload){
      // Vue.set(state.customers.customers[payload.index], 'name', payload.name)
      // Vue.swal('Success!', 'Purchase Updated Successfully!', 'success')
    },
    PURCHASEDESTROY(state, payload){
      state.customers.customers.splice(payload,1)
      Vue.swal('Success!', 'Purchase Deleted Successfully!', 'success')
    },
    GETPURCHASE(state, payload){
      state.purchased_product = payload
      router.push({ path: `/checkpurchase/${payload.id}` })
    },
    SETTINGSINIT(state, payload){
      state.settings = payload
    },
    SETTINGSUPDATE(state, payload){
      Vue.set(state.settings, 'branch_name', payload.branch_name)
      Vue.set(state.settings, 'branch_code', payload.branch_code)
      Vue.swal('Success!', 'Settings Updated Successfully!', 'success')
      router.push('/settings')
    },
    CUSTOMERPURCHASEINIT(state, payload){
      state.customer_purchase = payload.data
    },
    BRANCHPAY(state, payload){
      Vue.swal('Success!', 'Payment Received!', 'success')
      state.loading = false
    },
    PAYMENTINIT(state, payload){
      state.payments = payload.data
    },
    DUECUSTOMERSINIT(state, payload){
      state.due_customers = payload.data
    },
    ERROR(state, payload){      
      state.customers.errors.customer_name.firstname = payload['customer.customer_name.firstname']
      state.customers.errors.customer_name.middlename = payload['customer.customer_name.middlename']
      state.customers.errors.customer_name.lastname = payload['customer.customer_name.lastname']
      state.customers.errors.customer_details.date_of_birth = payload['customer.customer_details.date_of_birth']
      state.customers.errors.customer_details.civil_status = payload['customer.customer_details.civil_status']
      state.customers.errors.customer_details.employment_type = payload['customer.customer_details.employment_type']
      state.customers.errors.customer_details.mobile_number = payload['customer.customer_details.mobile_number']
      state.customers.errors.customer_details.landline_number = payload['customer.customer_details.landline_number']
      state.customers.errors.customer_details.place_of_birth = payload['customer.customer_details.place_of_birth']
      state.customers.errors.customer_details.date_of_birth = payload['customer.customer_details.date_of_birth']
      state.customers.errors.customer_details.religion = payload['customer.customer_details.religion']
      state.customers.errors.customer_details.email = payload['customer.customer_details.email']
      state.customers.errors.customer_details.educational_attainment = payload['customer.customer_details.educational_attainment']
      state.customers.errors.customer_address.present_address = payload['customer.customer_address.present_address']
      state.customers.errors.customer_address.permanent_address = payload['customer.customer_address.permanent_address'],
      state.customers.errors.customer_family.father_name = payload['customer.customer_family.father_name'],
      state.customers.errors.customer_family.mother_name = payload['customer.customer_family.mother_name'],
      state.customers.errors.customer_family.spouse_name = payload['customer.customer_family.spouse_name'],
      state.customers.errors.customer_family.dependent1 = payload['customer.customer_family.dependent1'],
      state.customers.errors.customer_family.dependent2 = payload['customer.customer_family.dependent2'],
      state.customers.errors.customer_family.dependent3 = payload['customer.customer_family.dependent3']
      state.customers.errors.customer_financial_info.income = payload['customer.customer_financial_info.income']
    }
  },
  actions: {
    getCustomersWithPurchase({commit}){
      axios({
        url: `${url}/api/getCustomersWithPurchase`,
        method:"get"
      }).then(res => {
        commit('CUSTOMERSWITHPURCHASE', res.data)
      }).catch(err => { 
        console.log(err.response)
      })
    },
    dueCustomersInit({commit}){
      axios({
        url: `${url}/api/get_due_costumers`,
        method:"get"
      }).then(res => {
        commit('DUECUSTOMERSINIT', res.data)
      }).catch(err => { 
        console.log(err.response)
      })
    },
    paymentsInit({commit}){
      axios({
        url: `${url}/api/payments`,
        method:"get"
      }).then(res => {
        commit('PAYMENTINIT', res.data)
      }).catch(err => { 
        console.log(err.response)
      })
    },
    addBranchPayment({commit, state, dispatch}, payload){
      state.loading = true
      axios({
        url: `${url}/api/payments`,
        method:"post",
        data:payload.pay
      }).then(res => {
        
        commit('BRANCHPAY', res.data)
        let data = {
          id: payload.product_id,
          purchase:{
            amount_due: payload.amount_due
          }
        }
        dispatch('purchasedProductsUpdate', data)
      })
    },
    getCustomerPurchase({commit}, payload){
      axios({
        url: `${url}/api/${payload}/get_purchase`,
        method:"get"
      }).then(res => {
        commit('CUSTOMERPURCHASEINIT', res.data)
      }).catch(err => { 
        console.log(err.response)
      })
    },
    settingsInit({commit}){
      axios({
        url: `${url}/api/settings`,
        method:"get"
      }).then(res => {
        commit('SETTINGSINIT', res.data)
      }).catch(err => { 
        console.log(err.response)
      })
    },
    settingsUpdate({commit, state}, payload){
      state.loading = true
      axios({
        url: `${url}/api/settings/${payload.old_branch.id}`,
        method: 'POST',
        data: {
          _method: 'PUT',
          branch_name: payload.new_branch.branch_name,
          branch_code: payload.new_branch.branch_code,
        }
      })
      .then(res => {
          commit('SETTINGSUPDATE', payload)
          state.loading = false
      })
      .catch(err => state.loading = false)
    },
    checkAppStatus({commit}){
      let auth_user = JSON.parse(localStorage.getItem('auth_user', 0))
      if(auth_user != null){
          auth_user.relogin = true
          commit('LOGIN', auth_user)
      }
    },
    login({commit, state}, payload){
      state.loading = true
      axios({
        url: `${url}/api/login`,
        method:"post",
        data:{
          username: payload.username,
          password: payload.password
        }
      }).then(res => {
        let data = {
          token: res.data.success.token,
          user: res.data.success.user
        }
        state.loading = false
        commit('LOGIN', data)
      }).catch(err => {
        state.loading = false
        console.log(err)        
        if (err.response.status == 401) {
          let data = {
            title: 'Error',
            message: 'Invalid Email/Password'
          }
          commit('LOGINERROR', data)
        }
        if (err.response.status == 500) {
          Vue.swal('Passport Error!', err.response.data.message, 'error')
        }
        if (err.errno == 'ECONNREFUSED') {
          commit('LOGINERROR', 'Error!', 'Conection to server failed!')
        }
      })
    },
    logout({commit}){
      commit('LOGOUT')
    },
    productInit({commit}){
      axios({
        url: `${url}/api/products`,
        method: 'GET'
      })
      .then(res => {
        commit('PRODUCTINIT', res.data)
      })
    },
    productStore({commit, state}, payload){
      state.loading = true
      axios({
        url: `${url}/api/products`,
        method: 'POST',
        data: {
          type: payload.type,
          brand: payload.brand,
          model: payload.model,
          color: payload.color,
          price: payload.price,
          quantity: payload.quantity,
          downpayment: payload.downpayment,
          price: payload.price,
          purchased_date: payload.purchased_date
        }
      })
      .then(res => {
        commit('PRODUCTSTORE', res.data)
        state.loading = false
        
      })
      .catch(err => {
        state.loading = false
      })
    },
    productUpdate({commit, state}, payload){
      state.loading = true
      axios({
        url: `${url}/api/products/${payload.id}`,
        method: 'POST',
        data: payload
      })
      .then(res => {
          let data = {
            index: payload.index,
            product: res.data
          }
          commit('PRODUCTUPDATE', data)
          state.loading = false
      })
      .catch(err => state.loading = false)
    },
    productDestroy({commit}, payload){
      Vue.swal({
        title: 'Do you really want to delete this Product?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return fetch(`${url}/api/products/${payload.id}`, {
              method: 'DELETE'
            })
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }
            })
            .catch(error => {
              Swal.showValidationMessage(
                `Request failed: ${error}`
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.value) {
          commit('PRODUCTDESTROY', payload.index)
        }
      })
    },
    roleInit({commit}){
      axios({
        url: `${url}/api/roles`,
        method: 'GET'
      })
      .then(res => {
        commit('ROLEINIT', res.data)
      })
    },
    roleStore({commit, state}, payload){      
      state.loading = true
      axios({
        url: `${url}/api/roles`,
        method: 'POST',
        data: {
          name: payload.name,
        }
      })
      .then(res => {
        commit('ROLESTORE', res.data)
        state.loading = false
        
      })
      .catch(err => {
        state.loading = false
      })
    },
    roleUpdate({commit, state}, payload){
      state.loading = true
      axios({
        url: `${url}/api/roles/${payload.id}`,
        method: 'POST',
        data: {
          _method: 'PUT',
          type: payload.name,
        }
      })
      .then(res => {
        commit('ROLEUPDATE', payload)
        state.loading = false
      })
      .catch(err => state.loading = false)
    },
    roleDestroy({commit}, payload){
      Vue.swal({
        title: 'Do you really want to delete this role?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return fetch(`${url}/api/roles/${payload.id}`, {
            method: 'DELETE'
            })
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }
            })
            .catch(error => {
              Swal.showValidationMessage(
                `Request failed: ${error}`
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.value) {
          commit('ROLEDESTROY', payload.index)
        }
      })
    },
    adminInit({commit}, payload){
      axios({
        url: `${url}/api/admins`,
        method: 'GET'
      })
      .then(res => {
        commit('ADMININIT', res.data)
      })
    },
    userStore({commit, state}, payload){
      state.loading = true
      axios({
        url: `${url}/api/users`,
        method: 'POST',
        data: {
          firstname: payload.firstname,
          middlename: payload.middlename,
          lastname: payload.lastname,
          username: payload.username,
          password: payload.password,
          role: payload.role,
        }
      })
      .then(res => {
        commit('USERSTORE', res.data.data)
        state.loading = false
        
      })
      .catch(err => {
        state.loading = false
      })
    },
    userUpdate({commit, state}, payload){      
      state.loading = true
      axios({
        url: `${url}/api/users/${payload.id}`,
        method: 'POST',
        data: {
          _method: 'PUT',
          firstname: payload.firstname,
          middlename: payload.middlename,
          lastname: payload.lastname,
          username: payload.username,
          role: payload.role_id,
        }
      })
      .then(res => {
        res.data.data.index = payload.index
        commit('USERUPDATE', res.data.data)
        state.loading = false
      })
      .catch(err => {
        console.error(err)
        state.loading = false
      })
    },
    userDestroy({commit}, payload){
      Vue.swal({
        title: 'Do you really want to delete this user?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        confirmButtonColor:'red',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return fetch(`${url}/api/users/${payload.id}`, {
              method: 'DELETE'
            })
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }
            })
            .catch(error => {
              Swal.showValidationMessage(
                `Request failed: ${error}`
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.value) {
          commit('USERDESTROY', payload.index)
        }
      })
    },
    customerInit({commit}){
      axios({
        url: `${url}/api/customers`,
        method: 'GET'
      })
      .then(res => {
        commit('CUSTOMERINIT', res.data)
      })
    },
    customerStore({commit, state}, payload){      
      state.loading = true
      axios({
        url: `${url}/api/customers`,
        method: 'POST',
        data: {
          customer: payload,
        }
      })
      .then(res => {        
        commit('CUSTOMERSTORE', res.data)
        state.loading = false
      })
      .catch(err => {
        state.loading = false
        commit('ERROR', err.response.data.errors)
      })
    },
    customerUpdate({commit, state}, payload){
      state.loading = true
      axios({
        url: `${url}/api/customers/${payload.id}`,
        method: 'PUT',
        data: payload
      })
      .then(res => {
        commit('CUSTOMERUPDATE', res.data)
        state.loading = false
      })
      .catch(err => state.loading = false)
    },
    customerDestroy({commit}, payload){
      Vue.swal({
        title: 'Do you really want to delete this customer?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        confirmButtonColor:'red',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return fetch(`${url}/api/customers/${payload.id}`, {
            method: 'DELETE'
            })
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }
            })
            .catch(error => {
              Vue.swal.showValidationMessage(
                `Request failed: ${error}`
              )
            })
        },
        allowOutsideClick: () => !Vue.swal.isLoading()
      }).then((result) => {
        if (result.value) {
          commit('CUSTOMERDESTROY', payload.index)
        }
      })
    },
    purchasedProductsInit({commit}){
      axios({
        url: `${url}/api/purchased_products`,
        method: 'GET'
      })
      .then(res => {
        commit('PURCHASEINIT', res.data)
      })
    },
    purchasedProductsStore({commit, state, dispatch}, payload){      
      state.loading = true
      let purchase_data = {
        term: payload.term,
        amount_finance: payload.amount_finance,
        monthly_amortization: payload.monthly_amortization,
        amount_due: payload.amount_finance,
        priority_level: payload.priority_level,
        MC_user_type: payload.MC_user_type,
        loan_purpose: payload.loan_purpose,
        sales_agent: payload.sales_agent,
        user_id: payload.user_id,
        product_id: payload.product_id
      }
      axios({
        url: `${url}/api/purchased_products`,
        method: 'POST',
        data: purchase_data
      })
      .then(res => {
        let app_details = {
          purchased_product_id: res.data.id,
          application_type: payload.application_type,
          tin: payload.tin,
          driver_license: payload.driver_license,
          sss: payload.sss,
          gsis: payload.gsis,
          customer_type: payload.customer_type
        }
        let app_requirements = {
          purchased_product_id: res.data.id,
          requirements: payload.requirements
        }
        let quantity = {
          id: payload.product_id,
          quantity: payload.quantity,
          fromPurchase: true
        }
        dispatch('addAppDetails', app_details)
        dispatch('addAppRequirements', app_requirements)
      })
      .catch(err => {
        console.log(err.response);
      })
    },
    addAppDetails({state, commit}, payload){
      console.log(payload)
      axios({
        url: `${url}/api/${payload.purchased_product_id}/app_details`,
        method: 'POST',
        data: payload
      })
      .then(() => {
      })
    },
    addAppRequirements({commit, state}, payload){
      axios({
        url: `${url}/api/${payload.purchased_product_id}/app_requirements`,
        method: 'POST',
        data: payload.requirements
      })
      .then(res => {
        commit('PURCHASESTORE')
        state.loading = false
      })
    },
    purchasedProductsUpdate({commit, state}, payload){
      console.log(payload);
      
      state.loading = true
      axios({
        url: `${url}/api/purchased_products/${payload.id}`,
        method: 'PUT',
        data: {
          _method: 'PUT',
          amount_due: payload.purchase.amount_due,
        }
      })
      .then(res => {
        commit('PURCHASEUPDATE', payload)
        state.loading = false
      })
      .catch(err => state.loading = false)
    },
    purchasedProductsDestroy({commit}, payload){
      Vue.swal({
        title: 'Do you really want to delete this Purchased Product?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return fetch(`${url}/api/purchased_products/${payload.id}`, {
            method: 'DELETE'
            })
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }
            })
            .catch(error => {
              Swal.showValidationMessage(
                `Request failed: ${error}`
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.value) {
          commit('PURCHASEDESTROY', payload.index)
        }
      })
    },
    getPurchaseDetails({commit}, payload){
      commit('GETPURCHASE', payload)
    }
  }
})
