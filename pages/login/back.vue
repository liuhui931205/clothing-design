<template>
	<view class="login">
		<!-- #ifdef MP-WEIXIN -->
		<button class="wxq-btn loginWx" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
		<button class="wxq-btn loginWx" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">手机</button>
		<!-- #endif -->

		<!-- #ifdef H5 || APP-PLUS -->
		<view class="form">
			<view class="phone">
				<input type="number" @input="getPhone" placeholder="请输入手机号" />
			</view>
			<view class="capt">
				<input class="captcha" type="number" @input="getCode" placeholder="请输入验证码"
					placeholder-class="placeholder-class" />
				<text class="get-capt" @click="handleGetCodeClick">{{showTime ?currentCountTime+'s重新获取':'获取验证码'}}</text>
			</view>
			<view class="atten">
				<view>
					为保障您的个人隐私权益，请在点击登录按钮前认真阅读
				</view>
				<view>
					<text class="link">《用户注册协议》</text>和
					<text class="link">《用户隐私政策》</text>
				</view>

			</view>

			<view class="login-btn" :class="{active: isActive}" @click="handleLogin">
				登录
			</view>


		</view>

		<!-- #endif -->



	</view>

</template>

<script>

	export default {
		
		data() {
			return {
				showTime: false,
				currentCountTime: 0,
				countTime: 20,
				timeId: null,
				code: "",
				phone: "",
				sData:{}
			}
		},
		created() {
			this.currentCountTime = this.countTime
		},
		onLoad: function() {
			// #ifdef MP-WEIXIN
			uni.login({
				success: (res) => {
					if (res.errMsg == "login:ok") {
						this.code = res.code;
					} else {
						uni.showToast({
							title: '系统异常，请联系管理员!'
						})
					}
				}
			})
			// #endif
			
		},
		methods: {
			
			//微信授权登录
			getUserInfo(e) {
				let that = this;
				var p = this.getSetting();
				p.then(function(isAuth) {
					console.log('是否已经授权', isAuth);
					if (isAuth) {
						console.log('用户信息，加密数据', e);
						//eData  包括//微信头像//微信名称 还有加密的数据.
						let eData = JSON.parse(e.detail.rawData);
						//接下来就是访问接口.
						console.log(eData);
						that.sData = eData
						that.$store.dispatch("logining", eData)
						// uni.switchTab({
						// 	url:"../member/member"
						// })
						
					} else {
						uni.showToast({
							title: '授权失败，请确认授权已开启',
							mask: true,
							icon: 'none'
						})
					}
				});
			},
			//获取用户的当前设置
			getSetting() {
				return new Promise(function(resolve, reject) {
					uni.getSetting({
						success: function(res) {
							if (res.authSetting['scope.userInfo']) {
								console.log('存在');
								resolve(true);
							} else {
								console.log('不存在');
								resolve(false);
							}
						}
					})
				}).catch((e) => {
					console.log(e)
				});;
			},
			getPhoneNumber: function (e) {
				// 9f480d7d2e41cc0ccc3fad2dfda9d1e4
				console.log("get_phone");
				console.log(e);
			    var that = this;
			    console.log(e.detail.errMsg == "getPhoneNumber:ok");
			    if (e.detail.errMsg == "getPhoneNumber:ok") {
			      this.$myRequest({
			        url: '/get_phone',
			        data: {
			          encryptedData: e.detail.encryptedData,
			          iv: e.detail.iv,
			          sessionKey: that.sData.session_key,
			          uid: "",
			        },
			        method: "POST",

			      }).then(res => {
					  console.log(res);
				  })
			    }
			  },
			getPhone(event) {
				this.phone = event.target.value
			},
			getCode(event) {
				this.code = event.target.value
			},
			handleGetCodeClick() {

				if (this.phone.length != 11 || !this.phone) {
					uni.showToast({
						duration: 1000,
						title: "手机号不正确"
					})
					return
				}
				this.$myRequest({
					url: "get_code",
					data: {
						phone:this.phone
					},
						
					method: "POST"
				}).then(res => {
					uni.showToast({
						duration: 1000,
						title: "验证码发送成功"
					})
				})
				this.showTime = true
				if (this.showTime && this.currentCountTime !== this.countTime) return
				this.currentCountTime
				this.timeId = setInterval(() => {
					if (this.currentCountTime <= 0) {
						this.currentCountTime = this.countTime
						this.showTime = false
						clearInterval(this.timeId)
					}
					this.currentCountTime--
				}, 1000)
			},
			handleLogin() {

				if (!this.isActive) {
					return
				}
				this.$myRequest({
					url: "login",
					method: "POST",
					data: {
						phone: this.phone,
						code: this.code
					}

				}).then(res => {
					uni.switchTab({
						url: "../index/index"
					})
					// this.$myRequest({
					// 	url: "/member/xdwxh5/member/verified/query?distributorId=zTBQeuNdKV&shopBizCode=zT9UeFTLUF"
					// }).then(re=>{
					// 	console.log(re);
					// })
				})
			}
		},
		computed: {
			isActive() {
				if (this.phone.length === 11 && this.code.length === 6) {
					return true
				}
				return false
			}
		}


	}
</script>

<style lang="scss">
	/* #ifdef MP-WEIXIN */
	.login {
		width: 750rpx;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.goback {
		width: 90%;
		background: #eee;
		color: #333;
		margin-bottom: 24rpx;
	}
	
	.loginWx {
		width: 90%;
		background: #04BE02;
		margin-bottom: 24rpx;
	}
	/* #endif */
	
	/* #ifdef APP-PLUS || H5 */
	.login {
		padding-left: 48rpx;
		padding-right: 48rpx;
		.header {
			width: 654rpx;
			height: 94rpx;
			
			
			.title {
				display: block;
				font-size: 18px;
			}
			.desc {
				display: block;
				margin-top: 8rpx;
				font-size: 13px;
				color: rgb(128,128,128);
			}
		}
		.form {
			padding-top: 44rpx;
			.phone {
				margin-top: 72rpx;
				padding-bottom: 14rpx;
				border-bottom: 1px solid rgb(240,240,240);
				font-size: 15px;
				line-height: 21px;
				height: 21px;
			}
			.capt {
				margin-top: 72rpx;
				padding-bottom: 14rpx;
				border-bottom: 1px solid rgb(240,240,240);
				display: flex;
				// width: 654rpx;
				line-height: 21px;
				height: 21px;
				font-size: 15px;
				.captcha {
					flex: 1;
					font-size: 15px;
				}
				.get-capt {
					
					width: 200rpx;
					color: rgb(179,179,179);
					font-size: 15px;
					
				}
			}
			.atten {
				margin-top: 30rpx;
				color: rgb(179,179,179);
				font-size: 13px;
				.link {
					color: rgb(88,108,148);
				}
			}
			.login-btn {
				margin-top: 64rpx;
				border-radius: 22px;
				background-color: rgb(248,190,190);
				font-size: 16px;
				line-height: 44px;
				text-align: center;
				color: white;
			}
			.active {
				background-color: rgb(230,37,37);
			}
		}
	}
	/* #endif */
	
	

</style>
