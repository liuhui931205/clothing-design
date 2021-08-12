<template>
	<view class="content">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="swiper">
			<swiper-item v-for="(item,index) in banners" :key="index">
				<view class="swiper-item">
					<image :src="item" mode=""></image>
				</view>
			</swiper-item>

		</swiper>
		<view class="recommend">
			<view class="re-item" v-for="(item,index) in recommends" :key="index" @click="itemClick(item.id)">
				<image :src="item.imgUrl" mode=""></image>
				<text>{{item.name}}</text>
			</view>
		</view>
		<view class="ad">
			<image src="http://qwuj9bu2d.hb-bkt.clouddn.com/adss/odin.png" mode=""></image>
		</view>
		
		<view class="new_prd">
			<view class="word">
				<text class="title">当季新品</text>
				<text class="sub-title">专注细节，品质为王</text>
			</view>
			<view class="new_list">
				<view class="new-item" v-for="(item,index) in features" :key="index" @click="itemDetail(item.id)">
					<image :src="item.img_url" mode=""></image>
					<view class="info">
						<text class="title">{{item.title}}</text>
						<text class="price">{{item.new_price | get_rmb}}</text>
					</view>
					
				</view>
			</view>
		</view>
		<view class="feature_prd">
			<view class="word">
				<text class="title">商务精选</text>
				<text class="sub-title">机洗免烫，防皱防污</text>
			</view>
			<view class="feature_list">
				<view class="feature-item" v-for="(item,index) in features" :key="index" @click="itemDetail(item.id)">
					<image :src="item.img_url" mode=""></image>
					<view class="info">
						<text class="title">{{item.title}}</text>
						<text class="price">{{item.new_price | get_rmb}}</text>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				banners: [],
				recommends: [],
				features: []
			}
		},
		onShow() {
			this.getBanner()
			this.getRecommend()
			this.getFeature()
		},
		filters:{
			get_rmb(rmb){
				return "¥" + rmb
			}
		},
		methods: {
			itemClick(id){
				uni.navigateTo({
					url:"../product-list/product-list?id="+id
				})
			},
			getBanner(){
				this.$myRequest({
					url: "index/get_bannars"
				}).then(e=>{
					this.banners = e.data.data
				})
			},
			getFeature(){
				this.$myRequest({
					url: "index/get_feature"
				}).then(e=>{
					this.features = e.data.data
				})
			},
			getRecommend(){
				this.$myRequest({
					url: "index/get_recommend"
				}).then(e=>{
					this.recommends = e.data.data
				})
			},
			itemDetail(id){
				uni.navigateTo({
					url:"../detail/detail?id=" +id
				
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		.swiper {
			width: 100%;
			height: 450px;
			.swiper-item {
				width: 100%;
				height: 100%;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		.recommend {
			width: 100%;
			height: 84px;
			display: flex;
			
			margin-top: 15px;
			.re-item {
				flex: 1;
				text-align: center;
				image {
					height: 50px;
					width: 50px;
					margin-bottom: 5px;

					
				}
				text {
					height: 14px;
					line-height: 14px;
					font-size: 14px;
					display: block;
				
				}
			}
			
		}
		.ad {
			image{
				width: 100%;
				height: 100px;
			}
		}
		.new_prd {
			width: 100%;

			.word {
				text-align: center;
				height: 80px;
				.title {
					height: 60px;
					font-size: 50px;
					display: block;
					letter-spacing: 20px;
				}
				.sub-title {
					font-size: 10px;
					height: 10px;
					letter-spacing: 5px;
				}
			}
			.new_list {
				margin-top: 10px;
				display: flex;
				flex-wrap: wrap;
				width: 742rpx;
				justify-content: space-around;
				padding: 4rpx;
				
				.new-item {

					width: 49%;
					position: relative;
					
					image {
						width: 100%;
						
						border-radius: 10rpx;
					}
					
					padding-bottom: 80rpx;
					.info {
						font-size: 24rpx;
						position: absolute;
						bottom: 10rpx;
						left: 0;
						right: 0;
						overflow: hidden;
						text-align: center;
						
						.title {
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							margin-bottom: 6px;
						}
						
						.price {
							color: red;
							// margin-right: 40rpx;
							display: block;
						}
					}
					
				}
			}
		}
		.feature_prd {
			width: 100%;
			margin-top: 20px;
			.word {
				text-align: center;
				height: 80px;
				.title {
					height: 60px;
					font-size: 50px;
					display: block;
					letter-spacing: 20px;
				}
				.sub-title {
					font-size: 10px;
					height: 10px;
					letter-spacing: 5px;
				}
			}
			.feature_list {
				margin-top: 10px;
				display: flex;
				flex-wrap: wrap;
				width: 742rpx;
				justify-content: space-around;
				padding: 4rpx;
				
				.feature-item {
		
					width: 49%;
					position: relative;
					
					image {
						width: 100%;
						
						border-radius: 10rpx;
					}
					
					padding-bottom: 80rpx;
					.info {
						font-size: 24rpx;
						position: absolute;
						bottom: 10rpx;
						left: 0;
						right: 0;
						overflow: hidden;
						text-align: center;
						
						.title {
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							margin-bottom: 6px;
						}
						
						.price {
							color: red;
							// margin-right: 40rpx;
							display: block;
						}
					}
					
				}
			}
		}
	}
</style>
