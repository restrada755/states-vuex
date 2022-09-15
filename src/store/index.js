import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './modules/auth.module'
import {cart} from './modules/cart.module'


Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    auth,
    cart
  }
})
