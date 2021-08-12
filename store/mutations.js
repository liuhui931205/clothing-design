import {LOGIN,ADD_COUNTER,ADD_TO_CART,CHECK, ALL_CHECK, ADD,CUT,LOGOUT} from "./mutations.types"
import Vue from 'vue'
export default {
	  [LOGIN](state,payload){
	  
	  		state.userInfo = payload
	  		
	   },
	   [LOGOUT](state,payload){
	   
	   		state.userInfo = {}
	   		
	    },
	   [ADD_COUNTER](state,payload){
	   //    let oldProduct = state.cartList.find(item => item.iid === payload.iid)
	   		// let c = oldProduct.count + 1
	   		
	   		let cart = JSON.parse(JSON.stringify(state.cartList))
	   		for (let i=0;i<cart.length;i++){
	   			if (cart[i].id === payload.id){
	   				cart[i].count ++
	   				break
	   			}
	   		}
	   		state.cartList = cart
	   		
	    },
	    [ADD_TO_CART](state,payload){
	      payload.checked = true
	      state.cartList.push(payload)
	    },
	    [CHECK](state,payload){
	   		let cart = JSON.parse(JSON.stringify(state.cartList))
			for (let item of cart) {
				if (item.id === payload){
					item.checked = !item.checked
					break
				}
			}
			

			state.cartList = cart
	    },
	    [ALL_CHECK](state,payload){
	   		let cart = JSON.parse(JSON.stringify(state.cartList))
	      cart.forEach(item => {
	      	item.checked = payload
	      })
	   		state.cartList = cart
	    },
		[ADD](state,payload){
			let cart = JSON.parse(JSON.stringify(state.cartList))
			cart.forEach(item => {
				if (item.id === payload){
					item.count ++
				}
				
			  })
			state.cartList = cart
		},
		[CUT](state,payload){
			let cart = JSON.parse(JSON.stringify(state.cartList))
		  cart.forEach(item => {
		  	if (item.id === payload){
				if (item.count > 0){
					item.count --
				}
		  		
		  	}
		  	
		    })
			state.cartList = cart
		},
}