<template>
	<view class="product">
		<view class="tabbar1">
			<view class="tabbr_item1" v-for="(item,index) in tabList" :key="index" @click="clickTabItem(index)">
				<text :class="{active:currentIndex === index}">{{item.name}}</text>
				<view class="arrow" v-if="item.isSort">
					<view class="iconfont iconjiantou02 ft-dark dflex-c"
						:class="{active: priceOrder === 1 && currentIndex === index} "></view>
					<view class="iconfont iconjiantou ft-dark dflex-c"
						:class="{active: priceOrder === 2 && currentIndex === index}"></view>
				</view>


			</view>
		</view>
		<view class="tabbar2">
			<view class="tabbr_item2" v-for="(item,index) in tabList" :key="index" @click="clickTabItem(index)">
				<text :class="{active:currentIndex === index}">{{item.name}}</text>
				<view class="arrow" v-if="item.isSort">
					<view class="iconfont iconjiantou02 ft-dark dflex-c"
						:class="{active: priceOrder === 1 && currentIndex === index} "></view>
					<view class="iconfont iconjiantou ft-dark dflex-c"
						:class="{active: priceOrder === 2 && currentIndex === index}"></view>
				</view>


			</view>
		</view>
		<scroll-view scroll-y="true" class="scroll" @scroll="scroll" @scrolltolower="loadMore">

			<view class="product-list">
				<view class="list-item" v-for="(item, index) in productList" :key="index" @click="itemDetail(item.id)">
					<!-- <image :src="item.img_url" mode=""></image> -->
					<easy-loadimage mode='widthFix' :scroll-top="scrollTop" :image-src="item.img_url" loading-mode="spin-circle"></easy-loadimage>
					<!-- <u-image :src="item.img_url" class="ttt"></u-image> -->
					<view class="info">
						<text class="title">{{item.title}}</text>
						<text class="price">{{item.new_price}}</text>
					</view>
				</view>
				
			</view>
			<view class="has-more" v-if="!hasNext">
				---------没有更多---------
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				productList: [],
				currentIndex: 0,
				scrollTop: 30,
				page: 1,
				refresherTrigger: false,
				_refresherTrigger:false,
				hasNext: true,
				tabList: [{
					name: "综合",
					isSort: false
				}, {
					name: "最新",
					isSort: false
				}, {
					name: "价格",
					isSort: true
				}, {
					name: "销量",
					isSort: false
				}],
				priceOrder: 2

			}
		},
		methods: {
			loadMore(){
				if (this.hasNext){
					this.getProducts("de")
				}
			},
			scroll(e) {
				this.scrollTop = e.detail.scrollTop
			},
			getProducts(type) {
				this.$myRequest({
					url: "detail/get_list?type=" + type + "&page=" +this.page
				}).then(e => {
					if (e.data.data.length === 0){
						this.hasNext = false
					}
					this.productList = [...this.productList,...e.data.data]
					this.page ++
				})
			},
			clickTabItem(index) {
				this.currentIndex = index
				if (index === 2) {
					this.priceOrder = this.priceOrder === 1 ? 2 : 1;
				}
			},
			itemDetail(id) {
				uni.navigateTo({
					url: "../detail/detail?id=" + id

				})
			}
		},
		onLoad(options) {

			this.getProducts(options.id)
			this.scrollTop = 30
		},
		onReady() {
			this.scrollTop = 80
		}
}
</script>

<style lang="scss">
	.product {

		width: 100%;
		height: 100vh;

		.tabbar1 {
			position: fixed;
			// #ifdef H5
			top: 44px;
			// #endif
			// #ifdef MP-WEIXIN
			top: 0;
			// #endif
			// #ifdef APP-PLUS
			top: 0;
			// #endif
			left: 0;
			right: 0;
			z-index: 9;
			background-color: #fff;
			display: flex;

			.tabbr_item1 {
				flex: 1;
				height: 40px;
				line-height: 40px;
				text-align: center;
				margin-left: 20px;
				display: flex;

				.active {
					color: red;
				}

				.arrow {
					margin-top: 12px;

					.iconfont {
						width: 30rpx;
						height: 14rpx;
						font-size: 20rpx;
						line-height: 1;
						margin-left: 4rpx;
					}
				}
			}
		}

		.tabbar2 {
			background-color: #fff;
			display: flex;

			.tabbr_item2 {
				flex: 1;
				height: 40px;
				line-height: 40px;
				text-align: center;
				margin-left: 20px;
				display: flex;

				.active {
					color: red;
				}

				.arrow {
					margin-top: 12px;

					.iconfont {
						width: 30rpx;
						height: 14rpx;
						font-size: 20rpx;
						line-height: 1;
						margin-left: 4rpx;
					}
				}
			}
		}


		.scroll {
			height: 100%;

			// margin-top: 40px;
			overflow: hidden;


			.product-list {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				padding: 32rpx;
				background: #F1F1F1;

				.list-item {
					width: 48%;
					// height: 500rpx;
					background: #fff;
					margin-bottom: 20rpx;
					border-radius: 20rpx;
					

					.easy-loadimage {
						width: 100%;
						// height: 500rpx;
						// margin-bottom: 38rpx;

						.origin-img {
							border-radius: 20rpx;
						}

						
						.loadfail-img,.loading-img {
							height: 300rpx;
						}
					}

					.info {
								// font-size: 24rpx;
								// position: absolute;
								// bottom: 10rpx;
								// left: 0;
								// right: 0;
								overflow: hidden;
						
								
								margin-bottom: 10px;
					
								.title {
					
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
									margin-bottom: 6px;
								}
					
								.price {
									color: red;
									// margin-left: 40rpx;
									// display: block;
								}
							}
					
				}

				// .list-item>>>.easy-loadimage {
				// 	width: 100%;
				// 	/* height: 500rpx; */
				// 	margin-bottom: 38rpx;
				// }

				// .list-item>>>.origin-img {
				// 	border-radius: 20rpx;
				// }

				// /* mode为widthFix即图片高度自适应时要设置占位图默认高度 */
				// .list-item>>>.loadfail-img,
				// .list-item>>>.loading-img {
				// 	height: 500rpx;
				// }
			}




			.has-more {
				width: 100%;
				height: 20px;
				text-align: center;
				line-height: 20px;
				background-color:  #f1f1f1;
			}


		}
	}
</style>
