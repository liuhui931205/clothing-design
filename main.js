import Vue from 'vue'
import App from './App'
import store from './store'
import {myRequest} from "util/api.js"


Vue.config.productionTip = false
Vue.prototype.$myRequest = myRequest
Vue.prototype.$store = store
App.mpType = 'app'



const app = new Vue({
    ...App,
	store
})
app.$mount()
