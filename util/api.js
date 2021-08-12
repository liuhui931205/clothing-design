// const BASE_URL = "http://192.168.1.73:9000/"
// const BASE_URL = "http://192.168.1.103:8000/"
const BASE_URL = "http://114.115.160.17:9000/"
export const myRequest = function(options) {
	return new Promise((resolve,reject) => {
		uni.request({
			url: BASE_URL + options.url,
			data: options.data || {},
			method:options.method || "GET",
			success(res) {
				if (res.statusCode !==200) {
					uni.showToast({
						title:"获取数据失败"
					})
				}
				resolve(res)
			},
			fail(err) {
				uni.showToast({
					title: "获取数据失败"
				})
				reject(err)
			}
			
		})
	})
}


export const htxcx = function(appid,secret,code) {
	return new Promise((resolve,reject) => {
		uni.request({
			url: "https://api.weixin.qq.com/sns/jscode2session?appid="+appid+"&secret="+secret+"&js_code="+code+"&grant_type=authorization_code",
			
			method:"GET",
			success(res) {

				resolve(res)
			},
			fail(err) {
				reject(err)
			}
			
		})
	})
}