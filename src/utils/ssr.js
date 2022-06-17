/**
 * @name ssr
 * @description createFetcher 用于在 create 生命周期
 * @author AEX 前端团队
 * @create_date 2022/06/16 15:32:51
 */

let uid = 0;
// 用于服务端入口插件
export const ssrServer = (Vue) => {
	const originalInit = Vue.prototype._init;

	// 重置vue初始化函数,获取uid
	Vue.prototype._init = function (options) {
		this.$$uid = uid++;
		originalInit.call(this, options);
	};

	// 异步数据获取函数 返回 promise[], 运行于 serverPrefetch 周期内
	Vue.prototype.$createFetcher = function (fetcher) {
		const vm = this;
		return function (params) {
			const p = fetcher(params);
			vm.$$promises.push(p);
			return p;
		};
	};

	Vue.mixin({
		// 增加ssr生命周期，用于在服务端运行数据获取
		serverPrefetch() {
			return Promise.all(this.$$promises);
		},
		data() {
			this.$$promises = [];

			return {};
		},
		// 在对应的运行中挂在数据到根实例
		created() {
			const $$selfData = this.$root.$$selfData || (this.$root.$$selfData = {});
			$$selfData[this.$$uid] = this.$data;
		},
	});
};

// 重置uid
ssrServer.done = () => (uid = 0);

// 用于客户端插件
export const ssrClient = (Vue, options = { stop: true }) => {
	// 运行于客户端
	Vue.prototype.$createFetcher = function (fetcher) {
		return function (params) {
			if (!ssrClient.$$resolved) {
				throw new Error('AEX SSR: 客户端还未挂载！！！ ');
			}
			return fetcher(params);
		};
	};

	Vue.mixin({
		created() {
			const $$selfData = this.$root.$$selfData;
			if (ssrClient.$$resolved || !$$selfData) return;
			Object.assign(this, $$selfData[this._uid] || {});
		},
		errorCaptured() {
			return !options.stop;
		},
	});
};

// 在客户端 app.$mount('#app')之后改为 true，用于接管客户端运行
ssrClient.$$resolved = false;
