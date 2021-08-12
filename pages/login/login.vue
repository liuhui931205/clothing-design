<template>

	<view class="login">
		<!-- #ifdef MP-WEIXIN -->
		<view class='header'>
			<image src='../../static/login.png'></image>
		</view>
		<view class='content'>
			<view>申请获取以下权限</view>
			<text>获得你的公开信息(昵称，头像、地区等)</text>
			<text>获得你微信绑定的手机号</text>
		</view>


		<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN"
			@getuserinfo="wxGetUserInfo" v-if="isLogin">
			授权登录
		</button>
		<!-- <button @click="open">打开弹窗</button> -->
		<uni-popup ref="popup" type="bottom" v-else>
			<view class="dialog">
				<view class="word">
					<text>获取手机号</text>
				</view>
				<view class="butt">
					<button class='d-bottom' size="mini" type='primary' @click="close">
						拒绝
					</button>
					<button class='d-bottom' size="mini" type='primary' open-type="getPhoneNumber"
						@getphonenumber="getPhoneNumber">
						允许
					</button>
				</view>

			</view>

		</uni-popup>

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
	import {
		htxcx
	} from "@/util/api.js"
	import {
		mapActions,
		mapGetters
	} from "vuex"
	export default {
		data() {
			return {
				appid: "wxc7e5c2fc9da0296a",
				secret: "aa07702a44a730671bb0894f9d4a5209",
				type: 0,
				phone: "",
				phoneParams: {
					sessionkey: "",
					ivdata: "",
					encrypdata: ""
				},
				nickName: "",
				avatarUrl: "",
				loginStatus: false,
				phoneStatus: false,
				isLogin: true,
				
				showTime: false,
				currentCountTime: 0,
				countTime: 20,
				timeId: null,
				code: "",
				sData:{}

			}
		},

		onLoad() {
			// #ifdef MP-WEIXIN
			try {
				this.init()
			} catch (e) {
				console.log("init错误信息：", e)
			}
			// #endif
		},
		methods: {
			...mapActions(["logining"]),
			async init() {
				var code = await this.login()
				// 获取sessionkey

				var key = await htxcx(this.appid, this.secret, code)
				this.phoneParams.sessionkey = key.data.session_key;
				console.log(key);
			},

			close() {
				let _this = this;
				_this.$refs.popup.close()
			},
			async wxGetUserInfo() { //第一授权获取用户信息===》按钮触发
				let _this = this;
				// 获取用户信息
				await uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						console.log(infoRes);
						_this.avatarUrl = infoRes.userInfo.avatarUrl
						_this.nickName = infoRes.userInfo.nickName
						_this.isLogin = false
						_this.loginStatus = true
						_this.$nextTick(() => {
							_this.$refs.popup.open("bottom")

						})
					},
					fail: function(fail) {
						console.log("fail:", fail)
					}
				});
			},
			login() {
				return new Promise((resolve, reject) => {

					uni.showLoading({
						title: '登录中...'
					});
					// 1.wx获取登录用户code
					uni.login({
						provider: 'weixin',
						success: function(loginRes) {
							console.log(loginRes);
							resolve(loginRes.code)
							uni.hideLoading();
						},
						fail(err) {
							reject(err)
							uni.hideLoading();
						}
					})
				})
			},
			reLaunch() {
				// #ifdef MP-WEIXIN
				if (this.loginStatus && this.phoneStatus) {
					this.$myRequest({
						url: "member/register",
						data: {phone:this.phone,nickName:this.nickName,avatarUrl:this.avatarUrl},
						method: "POST"
					}).then(res => {
						
						uni.setStorageSync(
							"userInfo",
							 res.data.data
						)
						this.logining(res.data.data)
					})
					uni.reLaunch({
						url: '/pages/index/index'
					})
				}
				// #endif
				// #ifdef H5 || APP-PLUS
				if (this.loginStatus) {
					this.$myRequest({
						url: "member/register",
						data: {phone:this.phone},
						method: "POST"
					}).then(res => {
						console.log("ddd");
						uni.setStorageSync(
							"userInfo",
							res.data.data
						)
						this.logining(res.data.data)
					})
					
					uni.reLaunch({
						url: '/pages/index/index'
					})
					
				}
				// #endif
				
				
			},
			async getPhoneNumber(e) {
				this.phoneParams.encrypdata = e.detail.encryptedData
				this.phoneParams.ivdata = e.detail.iv

				var phone = await this.$myRequest({
					url: "member/get_phone",
					data: this.phoneParams,
					method: "POST"
				})

				this.phone = phone.data.data.mobile
				if (this.phone) {
					this.phoneStatus = true
					this.$refs.popup.close()
					this.reLaunch()


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
					url: "member/get_code",
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
					url: "member/login",
					method: "POST",
					data: {
						phone: this.phone,
						code: this.code
					}
			
				}).then(res => {
					this.loginStatus = true
					this.reLaunch()
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

<style lang="scss" scoped>
	/* #ifdef MP-WEIXIN */
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}

	.login {
		height: 100vh;
	}

	.dialog {
		background-color: #fff;
		height: 300px;
		padding: 70rpx 50rpx;
		;

		.word {
			font-size: 16px;
			line-height: 30px;
			height: 30px;
		}

		.butt {

			width: 100%;
			text-align: center;

			.d-bottom {
				font-size: 35rpx;
				margin: 70rpx 50rpx;
				border-radius: 10rpx;

			}
		}

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
