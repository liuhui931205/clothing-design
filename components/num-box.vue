<template>
	<view class="num-box">
		<view class="cuts" @click="cut">
			-
		</view>
		<view class="nums">
			{{getCounter(value)}}
		</view>
		<view class="adds" @click="add">
			+
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from "vuex"
	export default {
		name:"num-box",
		data() {
			return {
				
			};
		},
		props:['value'],
		computed:{
			...mapGetters(["getCounter"])
		},
		methods: {
			...mapActions(["addCount","cutCount"]),
			add(){
				this.addCount(this.value)
			},
			cut(){
				this.cutCount(this.value)
			}
		}
	}
</script>

<style lang="scss">
	.num-box {
		display: flex;
		border: 1px solid #eee;
		background-color: #eee;
		width: 62px;
		height: 22px;
		.cuts {
			width: 20px;
			line-height: 20px;
			text-align: center;
			
		}
		.nums {
			width: 20px;
			line-height: 20px;
			text-align: center;
			
			background-color: #fff;
		}
		.adds {
			width: 20px;
			line-height: 20px;
			text-align: center;
			
		}
	}
</style>
