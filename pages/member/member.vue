<template>
	<view>
		<!-- <view class="up-swpier">
			<button type="default" @click="btSwiper">anniu</button>
		</view> -->
		<view class="member" >
			<view class="header">
				
			</view>
			<view class="info">
				<image :src="getUserInfo.url" mode="" class="avatr"></image>
				<text class="name">{{getNickName}}</text>
			</view>
			
			<view class="list">
				<view class="">
					<uni-list :border="false">
					    <uni-list-item  title="banner" :showArrow="true" @click.native="btSwiper"></uni-list-item>
					</uni-list>
				</view>
				<view class="">
					<uni-list>
					    <uni-list-item  title="列表右侧显示角标" :showArrow="true"  ></uni-list-item>
					    <uni-list-item title="列表右侧显示 switch"  :show-switch="true"  @switchChange="switchChange" ></uni-list-item>
					</uni-list>
				</view>
				<view class="">
					<uni-list :border="false">
					    <uni-list-item  title="列表右侧显示角标" :showArrow="true" ></uni-list-item>
					</uni-list>
				</view>
				
				<view class="second">
					<uni-list>
					    <uni-list-item  title="列表右侧显示角标" :showArrow="true"  ></uni-list-item>
					    <uni-list-item title="列表右侧显示 switch"  :show-switch="true"  @switchChange="switchChange" ></uni-list-item>
					</uni-list>
				</view>
				<view class="logout">
					<button type="default" @click="Logout">退出登录</button>
				</view>
			</view>
			
			
			
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapActions} from "vuex"
	export default {
		data() {
			return {

			}
		},
		methods: {
			...mapActions(["logining","logout"]),
			btSwiper() {
				uni.chooseImage({
					success: res => {
						this.$myRequest({
							url: "get_token"

						}).then(ress => {
							uni.uploadFile({
									url: 'https://up-z1.qiniup.com',
									filePath: res.tempFilePaths[0],
									name: 'file',
									formData: {
										'key': "banner/" + ress.data.data.key,
										// 'key': "backgroud",
										'token': ress.data.data.token
									}
								}

							)
						})

					}
				})
			},
			switchChange(){},
			Logout(){
				this.logout()
				uni.removeStorageSync("userInfo")
				uni.reLaunch({
					url:"../index/index"
				})
			}
		},
		computed:{
			...mapGetters(["getUserInfo","existLogin"]),
			getNickName(){
				if (!this.existLogin){
					return "未登录"
				}
				return this.getUserInfo.name
			},
			existCache(){
				var flag = false

				const v = uni.getStorageSync(
					"userInfo")
				if (v){
					console.log(v);
					this.logining(v)
					flag = true
				}
				
				// uni.getStorage({
				// 	key: "userInfo",
				// 	success: res =>{
				// 		this.logining(res.data)
				// 		flag = true
				// 		console.log("ssssßß");
						
				// 	},
				// 	fail() {
				// 		flag = false
						
				// 	}
				// })
				return flag
				
			}
		},
		created() {
			console.log(this.existCache);
			if (!this.existCache){
				uni.redirectTo({
					url:"../login/login"
				})
			}
		}
		
	}
</script>

<style lang="scss">
	.member {

		.header {
			height: 150px;
			background-image: url("http://qwuj9bu2d.hb-bkt.clouddn.com/backgroud");
			background-size: 100% 100%;
			background-repeat: no-repeat;
			padding: 0 10px 0;
			
			
		}
		.info {
			background-color: #fff;
			height: 80px;
			padding: 15px 10px 15px;
			// margin-top: 100px;
			display: flex;
			position: absolute;
			top:120px;
			right: 15px;
			left: 15px;
			border-radius: 15px;
		
			box-shadow: 2px 2px 1px #eee;
			
			.avatr {
				height: 50px;
				width: 50px;
				margin-right: 10px;
				border-radius: 100%;
			}
			.name {
				height: 45px;
				line-height: 45px;
				font-size: 20px;
				text-align: center;
			}
		}
		.list {
			background-color: #eee;
			position: absolute;
			top:220px;
			right: 0px;
			left: 0px;
			.second {
				margin-top: 10px;
			}
			.logout {
				margin-top: 10px;
				/* #ifdef APP-PLUS || MP-WEIXIN */
				margin-bottom: 10px;
				/* #endif */
				/* #ifdef H5 */
				margin-bottom: 60px;
				/* #endif */
			}
		}
		
		
	}

</style>
