import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import router from "./router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appState:{
      loggedIn:false
    },
    user:{
      users:{},
      auth_user:{},
      auth_token:""
    },
    products:[]
  },
  mutations: {
    LOGIN(state, payload){
      state.appState.loggedIn = true
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
      state.user.auth_token = ""
      state.user.auth_user = ""
      router.push('/')
      Vue.swal('Success!', 'Logged out Successfully!', 'success')
    },
    PRODUCTINIT(state, payload){
      state.products = payload.data
    },
    PRODUCTSTORE(state, payload){
      state.products.push(payload.data)
    },
    PRODUCTUPDATE(state, payload){
      Vue.set(state.products[payload.index], 'type', payload.type)
      Vue.set(state.products[payload.index], 'brand', payload.brand)
      Vue.set(state.products[payload.index], 'model', payload.model)
      Vue.set(state.products[payload.index], 'color', payload.color)
      Vue.set(state.products[payload.index], 'price', payload.price)
      Vue.set(state.products[payload.index], 'downpayment', payload.downpayment)
    },
    PRODUCTDESTROY(state, payload){
      state.products.splice(payload,1)
    }
  },
  actions: {
    login({commit}, payload){
      axios({
        url: "https://mighty-savannah-84780.herokuapp.com/api/login",
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
        commit('LOGIN', data)
      }).catch(err => {
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
        url: 'https://mighty-savannah-84780.herokuapp.com/api/products',
        method: 'GET'
      })
      .then(res => {
        commit('PRODUCTINIT', res.data)
      })
    },
    productStore({commit}, payload){
      axios({
        url: 'https://mighty-savannah-84780.herokuapp.com/api/products',
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
      })
    },
    productUpdate({commit}, payload){
      axios({
        url: `https://mighty-savannah-84780.herokuapp.com/api/products/${payload.id}`,
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
      })
    },
    productDestroy({commit}, payload){
      axios({
        url: `https://mighty-savannah-84780.herokuapp.com/api/products/${payload.id}`,
        method: 'POST',
        data: {
          _method: 'DELETE'
        }
      })
      .then(res => {
        commit('PRODUCTDESTROY', payload.index)
      })
    }
  }
})
