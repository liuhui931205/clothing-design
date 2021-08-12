<template>
	<view class="detail">
		<scroll-view scroll-y="true" class="scroll">

			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="swiper">
				<swiper-item v-for="(item,index) in detailInfo.img_urls" :key="index">
					<view class="swiper-item">
						<image :src="item" mode=""></image>
					</view>
				</swiper-item>

			</swiper>
			<view class="header-info">

				<view class="title">
					<text>{{detailInfo.title}}</text>
				</view>
				<view class="price">
					<text>{{detailInfo.new_price}}</text>
					<text>{{detailInfo.old_price | get_rmb}}</text>

				</view>
				<text class="sell">销量：0</text>


			</view>
			<view class="prd-style">
				<view class="colors">
					<text>颜色</text>
					<view class="check">
						<uni-data-checkbox v-model="value" :localdata="styleInfo.color" @change="change" mode="button">
						</uni-data-checkbox>
					</view>
				</view>
				<view class="sizes">
					<text>大小</text>
					<view class="check">
						<uni-data-checkbox v-model="sizeValue" :localdata="getSize" @change="changeSize" mode="button">
						</uni-data-checkbox>
					</view>

				</view>

			</view>
			<view class="prd-detail">
				<view class="header">
					<text>宝贝详情</text>
				</view>
				<view class="img-item" v-for="(item,index) in detailInfo.detail_url" :key="index">
					<image :src="item" mode="widthFix"></image>
				</view>
			</view>



		</scroll-view>

		<view class="nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>

	</view>
</template>

<script>
	import uniGoodsNav from '@/components/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.vue'
	import {
		mapActions,
		mapGetters
	} from "vuex"
	export default {
		data() {
			return {
				detailInfo: {},
				styleInfo: {},
				value: 0,
				sizeValue: 0,
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		components: {
			uniGoodsNav
		},
		methods: {
			...mapActions(["addCart", "changeCheck", "changeAllCheck"]),
			onClick(e) {
				if (e.index === 0) {

				} else if (e.index == 1) {
					uni.switchTab({
						url: "../order/order"
					})
				}
			},
			buttonClick(e) {
				if (e.index === 0) {
					const product = {}
					product.img_url = this.detailInfo.img_urls[0]
					product.title = this.detailInfo.title
					product.price = this.detailInfo.new_price
					product.id = this.detailInfo.id
					product.color = this.styleInfo.color[this.value].text
					product.size = this.styleInfo.maps[this.styleInfo.color[this.value].text][this.sizeValue].text
					this.addCart(product).then(res =>{
						uni.showToast({
							title: res,
							duration: 2000
						})
						this.options[1].info = this.cartLength
					})

				} else if (e.index === 1) {
					const product = {}
					product.img_url = this.detailInfo.img_urls[0]
					product.title = this.detailInfo.title
					product.price = this.detailInfo.new_price
					product.id = this.detailInfo.id
					product.color = this.styleInfo.color[this.value].text
					product.size = this.styleInfo.maps[this.styleInfo.color[this.value].text][this.sizeValue].text
					this.addCart(product).then(
						res => {
							uni.switchTab({
								url: "../order/order"
							})
						}
					)
					
				}
			},
			getDetail(id) {
				this.$myRequest({
					url: "detail/get_detail?id=" + id
				}).then(e => {
					this.detailInfo = e.data.data
				})
			},
			getStyle(id) {
				this.$myRequest({
					url: "detail/get_style?id=" + id
				}).then(e => {
					this.styleInfo = e.data.data
				})
			},
			change(e) {
				this.value = e.detail.value;
			},
			changeSize(e) {
				console.log(e.detail.value);
				this.sizeValue = e.detail.value;
			}
		},
		computed: {
			getSize() {
				// console.log(this.styleInfo.color);
				if (Object.keys(this.styleInfo).length !== 0) {
					return this.styleInfo.maps[this.styleInfo.color[this.value].text]
				}
				// console.log(this.styleInfo.maps[this.styleInfo.color[this.value].text]);

			},
			...mapGetters(["cartLength", "cartList"])
		},
		filters: {
			get_rmb(rmb) {
				return "¥" + rmb
			}
		},
		onLoad(options) {
			this.getDetail(options.id)
			this.getStyle(options.id)
		},
		onShow() {
			this.options[1].info = this.cartLength
		}
	}
</script>

<style lang="scss">
	.detail {
		background-color: #eee;
		width: 100%;

		// height: 100vh;
		.scroll {
			height: calc(100vh - 100px);
			overflow: hidden;

			.swiper {
				height: 750rpx;

				.swiper-item {
					width: 100%;
					height: 100%;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.header-info {




				margin-top: 8px;
				height: 100px;
				width: 100%;
				padding: 15px;
				// border-bottom: 1px solid #eee;
				background-color: #fff;
				border-radius: 5px;

				.title {
					font-size: 16px;
				}

				.price {
					text:nth-child(2) {
						margin-left: 8px;
						font-size: 8px;
						color: black;
						text-decoration: line-through;
					}

				}

				.sell {
					font-size: 6px;
					color: #A9A9A9;
				}

			}

			.prd-style {

				// height: 60px;
				width: 100%;
				background-color: #fff;
				font-size: 15px;
				margin: 8px 0;
				border-radius: 5px;

				.colors {



					.check {
						padding: 15px;
						margin-left: 34px;

					}

					text {
						margin-left: 15px;
					}
				}

				.sizes {

					.check {
						margin-left: 34px;
					}

					text {
						margin-left: 15px;
					}
				}
			}

			.prd-detail {
				.header {
					background-color: #fff;
					height: 50px;
					line-height: 50px;
					font-size: 18px;
					text-align: center;
				}

				.img-item {
					width: 100%;

					image {
						width: 100%;

					}
				}
			}

		}

		.nav {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
		}
	}
</style>
