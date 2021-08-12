<template>
	<view class="carts">
		<scroll-view scroll-y="true" class="scroll">
			<view class="cart-item" v-for="(item,index) in cartList" :key='index'>
				<view class="iconfont iconxuanzhong ft-dark dflex-c check" :class="{active: item.checked}" @click="clickCheck(item.id)"></view>
				<view class="info">
					<view class="desc-img">
						<image :src="item.img_url" mode="aspectFill"></image>
					</view>
					
					<view class="word-info">
						<view class="title">
							<text>{{item.title}}</text>
						</view>
						<view class="count">
							<text class="price">{{item.price}}</text>
							<!-- <view class="num">
								<uni-number-box :value="item.count" ></uni-number-box>
							</view> -->
							<num-box :value="item.id" class="num"></num-box>
						</view>
						
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="bo-bar">
			<view class="check-all">
				<view class="iconfont iconxuanzhong ft-dark dflex-c check" :class="{active: getCheckAll}" @click="clickAllCheck"></view>
				<text>全选</text>
				<text class="co">总计: ¥{{getCount}}</text>
			</view>
			<view class="count-all">
				<text>结算</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from "vuex"
	import numBox from '@/components/num-box'
	export default {
		data() {
			return {
				
			}
		},
		components: {numBox},
		methods: {
			...mapActions(["changeCheck","changeAllCheck"]),
			clickCheck(id){
				this.changeCheck(id)
			},
			clickAllCheck(){
				
				this.changeAllCheck(!this.getCheckAll)
			}
		},
		computed:{
			...mapGetters(["cartLength", "cartList"]),
			getCheckAll(){
				return this.cartList.filter(item => {
					return !item.checked
				}).length === 0
			},
			getCount(){
				return this.cartList.filter(r => {
					return r.checked
				}) .reduce((total, item) =>{
					return total += item.count * item.price
				},0).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	.carts {

		width: 100%;
		.scroll {
			background-color: #DCDCDC;
			/* #ifdef MP-WEIXIN || APP-PLUS*/
			height: calc(100vh - 50px);
			/* #endif */
			/* #ifdef H5 */
			height: calc(100vh - 144px);
			/* #endif */

			.cart-item {
				background-color: #fff;
				display: flex;
				border-bottom: 1px solid #eee;
				// border-radius: 8px;
				.check {
					width: 60rpx;
					
				}
				.active {
					color: red;
				}
				.info {
					width: 690rpx;
					display: flex;
					height: 100px;
					.desc-img {
						width: 200rpx;
						height: 100px;
						image {
							width: 100%;
							height: 100%;
						}
					}
					
					.word-info {
						width: 490rpx;
						margin-left: 6px;
						.title{
							text{
								font-size: 16px;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
							
						}
						.count{
							margin-top: 40px;
							height: 22px;
							display: flex;
							.price{
								
							}
							.num {
								position: absolute;
								right: 30px;
							}
						}
					}
				}
			}
			
		}
		.bo-bar {
			height: 50px;
			position: absolute;
			
			/* #ifdef MP-WEIXIN || APP-PLUS*/
			bottom: 0;
			/* #endif */
			/* #ifdef H5 */
			bottom: 0;
			/* #endif */
			
			
			left: 0;
			right: 0;
			display: flex;
			.check-all{
				display: flex;
				.check {
					width: 60rpx;
				}
				.active {
					color: red;
				}
				text {
					line-height: 50px;
					text-align: center;
				}
				.co{
					margin-left: 40px;
				}
			}
			.count-all {
				width: 80px;
				position: absolute;
				right: 0;
				line-height: 50px;
				text-align: center;
				background-color: red;
			}
		}
	}

</style>
