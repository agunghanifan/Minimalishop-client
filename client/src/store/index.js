import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
// const baseUrl = 'http://localhost:3000'
const baseUrl = 'https://cms-ecommerce-agungs.herokuapp.com'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: false,
    products: [],
    carts: [],
    errors: [],
    response: '',
    banners: []
  },
  mutations: {
    TOKEN_ACTIVE (state) {
      state.token = true
      router.push('/')
    },
    DELETE_TOKEN (state) {
      state.token = false
      router.push('/login')
    },
    PUSH_TO_LOGIN_PAGE () {
      router.push('/login')
    },
    STORE_PRODUCTS (state, payload) {
      state.products = payload
    },
    STORE_CARTS (state, payload) {
      state.carts = payload
    },
    SHOW_ERROR (state, payload) {
      state.errors = payload
    },
    CLEAR_ERRORS (state, payload) {
      state.errors = []
    },
    CLEAR_RESPONSE (state, payload) {
      state.response = []
    },
    SHOW_RESPONSE (state, payload) {
      state.response = payload
    },
    FETCH_BANNERS (state, payload) {
      state.banners = payload
    }
  },
  actions: {
    login (context, payload) {
      axios({
        url: baseUrl + '/loginCustomer',
        method: 'post',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          context.commit('TOKEN_ACTIVE', data.access_token)
        })
        .catch((err) => {
          // console.log(err.response.data.message)
          context.commit('SHOW_ERROR', err.response.data.message)
        })
    },
    logout (context) {
      localStorage.removeItem('access_token')
      context.commit('DELETE_TOKEN')
    },
    register (context, payload) {
      axios({
        url: baseUrl + '/register',
        method: 'post',
        data: payload
      })
        .then(({ data }) => {
          context.commit('PUSH_TO_LOGIN_PAGE')
        })
        .catch((err) => {
          // console.log(err.response.data.message)
          context.commit('SHOW_ERROR', err.response.data.message)
        })
    },
    fetchProducts (context, payload) {
      axios({
        url: baseUrl + '/products',
        method: 'get'
      })
        .then((response) => {
          context.commit('STORE_PRODUCTS', response.data)
        })
        .catch((err) => {
          // console.log(err.response.data.message)
          context.commit('SHOW_ERROR', err.response.data.message)
        })
    },
    addtocart (context, payload) {
      axios({
        url: baseUrl + `/addtocarts/${payload}`,
        method: 'post',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then((data) => {
          context.commit('SHOW_RESPONSE', 'Product berhasil di masukkan ke keranjang')
        })
        .catch((err) => {
          // console.log(err.response.data.message)
          context.commit('SHOW_ERROR', err.response.data.message)
        })
    },
    fetchCarts (context, payload) {
      axios({
        url: baseUrl + '/carts',
        method: 'get',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          context.commit('STORE_CARTS', data)
        })
        .catch((err) => {
          // console.log(err.response.data.message)
          context.commit('SHOW_ERROR', err.response.data.message)
        })
    },
    operatorStock (context, payload) {
      // console.log(payload)
      axios({
        url: baseUrl + `/carts/${payload.id}/${payload.operator}`,
        method: 'patch',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then((res) => {
          context.commit('SHOW_RESPONSE', res.data.message)
        })
        .catch((err) => {
          // console.log(err.response.data.message)
          context.commit('SHOW_ERROR', err.response.data.message)
        })
    },
    deleteCart (context, payload) {
      axios({
        url: baseUrl + `/carts/${payload}`,
        method: 'delete',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then((res) => {
          context.commit('SHOW_RESPONSE', res.data.message)
        })
        .catch((err) => {
          // console.log(err)
          context.commit('SHOW_ERROR', err.response.data.message)
        })
    },
    fetchBanners (context, payload) {
      axios({
        url: baseUrl + '/banners',
        method: 'get'
      })
        .then(({ data }) => {
          context.commit('FETCH_BANNERS', data)
        })
        .catch((err) => {
          context.commit('SHOW_ERROR', err.response.data.message)
        })
    }
  },
  modules: {
  }
})
