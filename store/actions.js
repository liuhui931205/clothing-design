import {ADD_COUNTER,ADD_TO_CART,CHECK,ALL_CHECK, LOGIN, ADD, CUT,LOGOUT} from "./mutations.types"
export default {
	logining(context,payload){
		context.commit(LOGIN, payload)
	},
	logout(context,payload){
		context.commit(LOGOUT, payload)
	},
	addCart(context,payload){
		return new Promise((resolve, reject) => {
			let oldProduct = context.state.cartList.find(item => item.id === payload.id)
			if (oldProduct){
			        context.commit(ADD_COUNTER, payload)
			        resolve("数量+1")
			      }else {
			        payload.count = 1
			        context.commit(ADD_TO_CART, payload)
			        resolve("添加到购物车")
			      }
		})
	},
	changeCheck(context,payload){
		context.commit(CHECK, payload)
	
	},
	changeAllCheck(context,payload){
		context.commit(ALL_CHECK,payload)
	
	},
	addCount(context,payload){
		context.commit(ADD, payload)
	},
	cutCount(context,payload){
		context.commit(CUT, payload)
	}
	
}