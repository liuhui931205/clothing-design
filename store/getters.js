export default {
  getUserInfo(state){
    return state.userInfo
  },
  existLogin(state){
    return Object.keys(state.userInfo).length  !== 0
  },
  cartLength(state){
    return state.cartList.length
  },
  cartList(state){
    return state.cartList
  },
  getCounter(state){
    return function(id){
		for(let obj of state.cartList) {
			if (obj.id === id){
				return obj.count
			}
		}
		
	}
  }
  
  
}