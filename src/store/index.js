import { createStore } from 'vuex'
import {AccountAuth,UserAccount} from '../net_util/index.js'
export default createStore({
  state: {
	  loginObj:window.localStorage.getItem("loginObj"),
  },
  mutations: {
	  login(state,payload){
		  state.loginObj=payload
		  window.localStorage.setItem("loginObj", payload)
	  },
	  logout(state){
		   state.loginObj=null
		   window.localStorage.clear()
	  }
	  		
  },
  actions: {
	 
  },
  modules: {
  }
})
