<template>
	<div class="home">
		<h1>Home page</h1>
		<h3>Vuex数据 {{ $store.state.test }}</h3>
		<h3>当前组件data{{ home_id }}</h3>
		<ch />
		<aex-button>Aex-ui</aex-button>
	</div>
</template>

<script>
import ch from '@/components/ch.vue';
export default {
	name: 'Home',
	data() {
		return {
			home_id: 1234,
		};
	},
	components: {
		ch,
	},
	mounted() {},
	async created() {
		const fetcher = this.$createFetcher(this.fetchName);
		const res = await fetcher();

		this.home_id = res;
	},
	methods: {
		async fetchName() {
			return 34343434;
		},
	},
};
</script>
