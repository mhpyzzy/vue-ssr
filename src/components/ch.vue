<!--
* @name ch
* @description 我很懒什么都不想写
* @author AEX 前端团队
* @create_date 2022/06/10 11:56:37
-->
<template>
	<div class="ch">
		<div>子组件</div>
		<div>子组件 data：{{ key }}</div>
	</div>
</template>

<script>
export default {
	name: 'ch',
	data() {
		return {
			key: '0',
		};
	},
	computed: {},
	mounted() {},
	async created() {
		const fetcher = await this.$createFetcher(this.fetchName);
		const res = await fetcher();
		this.key = res;
	},
	methods: {
		async fetchName() {
			return new Date().getTime();
		},
	},
};
</script>

<style lang="less" scoped>
.ch {
	border: 1px solid #ccc;
	padding: 30px;
	margin: 20px;
	background: #f8f8f8;
}
</style>
