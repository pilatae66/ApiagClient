import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import router from "./router";

Vue.use(Vuex)
let url = !process.env.IS_TEST ? 'http://localhost:8000' : 'https://mighty-savannah-84780.herokuapp.com'

export default new Vuex.Store({
  state: {
    appState:{
      loggedIn:false
    },
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
    },
    loading: false,
    drawer: false
  },
  mutations: {
    LOGIN(state, payload){
      state.appState.loggedIn = true
      state.drawer = true
      state.user.auth_token = payload.token
      state.user.auth_user = payload.user
      router.push('dashboard')
      Vue.swal('Success!', 'Logged in Successfully!', 'success')
    },
    LOGINERROR(state, payload){
      Vue.swal(payload.title, payload.message, 'error')
    },
    LOGOUT(state){
      state.appState.loggedIn = false,
      state.drawer = false
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
      Vue.set(state.products.products[payload.index], 'type', payload.type)
      Vue.set(state.products.products[payload.index], 'brand', payload.brand)
      Vue.set(state.products.products[payload.index], 'model', payload.model)
      Vue.set(state.products.products[payload.index], 'color', payload.color)
      Vue.set(state.products.products[payload.index], 'price', payload.price)
      Vue.set(state.products.products[payload.index], 'downpayment', payload.downpayment)
      state.products.errors.type = ""
      state.products.errors.brand = ""
      state.products.errors.model = ""
      state.products.errors.color = ""
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
    CUSTOMERSTORE(state, payload){
      state.customers.customers.push(payload)
      state.customers.errors.name = ""
      Vue.swal('Success!', 'Role Added Successfully!', 'success')
    },
    CUSTOMERUPDATE(state, payload){
      Vue.set(state.customers.customers[payload.index], 'name', payload.name)
      state.customers.errors.name = ""
      Vue.swal('Success!', 'Role Updated Successfully!', 'success')
    },
    CUSTOMERDESTROY(state, payload){
      state.customers.customers.splice(payload,1)
      Vue.swal('Success!', 'Role Deleted Successfully!', 'success')
    }
  },
  actions: {
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
        console.log(err.response)        
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
          downpayment: payload.downpayment
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
        data: {
          _method: 'PUT',
          type: payload.type,
          brand: payload.brand,
          model: payload.model,
          color: payload.color,
          price: payload.price != 0 ? Number(payload.price.replace(/[^0-9.-]+/g,"")) : 0,
          downpayment: payload.downpayment != 0 ? Number(payload.downpayment.replace(/[^0-9.-]+/g,"")) : 0
        }
      })
      .then(res => {
        commit('PRODUCTUPDATE', payload)
        state.loading = false
      })
      .catch(err => state.loading = false)
    },
    productDestroy({commit}, payload){
      Vue.swal({
        title: 'Do you really want to delete this role?',
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
        console.log(res.data.data);
        
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
          name: payload.name,
        }
      })
      .then(res => {
        commit('CUSTOMERSTORE', res.data)
        state.loading = false
        
      })
      .catch(err => {
        state.loading = false
      })
    },
    customerUpdate({commit, state}, payload){
      state.loading = true
      axios({
        url: `${url}/api/customers/${payload.id}`,
        method: 'POST',
        data: {
          _method: 'PUT',
          type: payload.name,
        }
      })
      .then(res => {
        commit('CUSTOMERUPDATE', payload)
        state.loading = false
      })
      .catch(err => state.loading = false)
    },
    customerDestroy({commit}, payload){
      Vue.swal({
        title: 'Do you really want to delete this customer?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
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
              Swal.showValidationMessage(
                `Request failed: ${error}`
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.value) {
          commit('CUSTOMERDESTROY', payload.index)
        }
      })
    }
  }
})
